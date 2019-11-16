from .views import ServiceViewSet
from django.urls import path
from django.conf.urls import include, url
from rest_framework import routers
from .views import ServiceViewSet, DashboardServiceViewSet, CategoryListView


router = routers.DefaultRouter()
router.register('api/dashboard/services', DashboardServiceViewSet, 'user-services')

urlpatterns = [
	path('api/services/search/', ServiceViewSet.as_view()),
	path('api/services/categories/', CategoryListView.as_view()),
]

urlpatterns += router.urls