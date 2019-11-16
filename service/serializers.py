from rest_framework import serializers, generics
from rest_framework_gis.serializers import GeoModelSerializer
from account.models import User
from django.contrib.auth import authenticate
from .models import Service, ServiceImage, Category
from versatileimagefield.serializers import VersatileImageFieldSerializer


class ServiceImageSerializer(serializers.ModelSerializer):
	image = VersatileImageFieldSerializer(sizes=[('full', 'url'), ('thumbnail', 'thumbnail__300x300')])
	class Meta:
		model = ServiceImage
		exclude = ('service', 'ppoi',)


class ServiceSerializer(GeoModelSerializer):
	images = ServiceImageSerializer(required=False, many=True)
	class Meta:
		model = Service
		fields = ('title', 'description', 'keywords', 'location', 'phone', 'images', 'category',)
		geo_field = 'location'


class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = '__all__'