from .views import ServiceViewSet
from django.urls import path
from django.conf.urls import include, url
from rest_framework import routers
from .views import ServiceViewSet, ServicesViewSet


urlpatterns = [
	path('api/services/search/', ServiceViewSet.as_view()),
]
