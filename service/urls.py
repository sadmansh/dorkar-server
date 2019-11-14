from .views import ServiceViewSet
from django.urls import path
from django.conf.urls import include, url
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/services', ServiceViewSet, 'services')

urlpatterns = [
    path('', include(router.urls)),
]
