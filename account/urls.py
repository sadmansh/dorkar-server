from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from .views import RegistrationAPIView, LoginAPIView, LogoutAPIView, UserAPIView


urlpatterns = [
	path('api/account/auth/', include('knox.urls')),
	path('api/account/register/', RegistrationAPIView.as_view()),
	path('api/account/login/', LoginAPIView.as_view()),
	path('api/account/logout/', LogoutAPIView.as_view()),
	path('api/account/user/', UserAPIView.as_view()),
]