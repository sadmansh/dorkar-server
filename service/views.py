from django.shortcuts import render
from .serializers import ServiceSerializer
from rest_framework import viewsets, generics
from .models import Service


class ServiceViewSet(viewsets.ModelViewSet):
	serializer_class = ServiceSerializer

	def get_queryset(self):
		return Service.objects.all()