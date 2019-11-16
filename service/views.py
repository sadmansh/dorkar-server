from django.contrib.gis.db.models.functions import Distance, AsGeoJSON
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.contrib.postgres.aggregates import StringAgg
from rest_framework.permissions import IsAuthenticated
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.shortcuts import render
from .serializers import ServiceSerializer
from rest_framework import viewsets, generics
from rest_framework.response import Response
from .models import Service


class ServiceViewSet(generics.GenericAPIView):
	serializer_class = ServiceSerializer

	def post(self, request, *args, **kwargs):
		qs = Service.objects

		if self.request.data['location'] != '':
			lat_long = self.request.data['location'].split(',')
			user_location = Point(float(lat_long[1]), float(lat_long[0]), srid=4326)

		keywords = self.request.data['keywords']
		category = self.request.data['category']

		query = SearchQuery(keywords) & SearchQuery(category)
		vector = SearchVector('title', 'description', StringAgg('keywords', delimiter=', ')) + SearchVector(StringAgg('category__slug', delimiter=' '))
		# qs = qs.filter(location__distance_lte=(user_location, D(km=20)))
		qs = qs.annotate(search=vector).filter(search=query).distinct()
		qs = qs.annotate(rank=SearchRank(vector, query)).order_by('-rank')
		qs = qs.annotate(distance=Distance('location', user_location), place=AsGeoJSON('location')).order_by('distance')

		serializer = ServiceSerializer(qs, many=True, context={'request': request})
		return Response(serializer.data)


class UserServiceViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class = ServiceSerializer

	def get_queryset(self):
		return self.request.user.services.all()

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)