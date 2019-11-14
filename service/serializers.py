from rest_framework import serializers
from account.models import User
from django.contrib.auth import authenticate
from .models import Service, ServiceImage
from versatileimagefield.serializers import VersatileImageFieldSerializer


class ServiceImageSerializer(serializers.ModelSerializer):
	image = VersatileImageFieldSerializer(sizes=[('full', 'url'), ('thumbnail', 'thumbnail__300x300')])
	class Meta:
		model = ServiceImage
		exclude = ('service', 'ppoi',)


class ServiceSerializer(serializers.ModelSerializer):
	images = ServiceImageSerializer(required=False, many=True)
	class Meta:
		model = Service
		fields = ('title', 'description', 'keywords', 'location', 'phone', 'images', 'category', 'user',)
