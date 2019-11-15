from django.contrib.auth.signals import user_logged_in, user_logged_out
from rest_framework import viewsets, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from .serializers import UserSerializer, CreateUserSerializer, UserLoginSerializer


class RegistrationAPIView(generics.GenericAPIView):
	serializer_class = CreateUserSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		return Response({
			'user': UserSerializer(user, context=self.get_serializer_context()).data,
			'token': AuthToken.objects.create(user)[1]
		})


class LoginAPIView(generics.GenericAPIView):
	serializer_class = UserLoginSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		return Response({
			'user': UserSerializer(user, context=self.get_serializer_context()).data,
			'token': AuthToken.objects.create(user)[1]
		})


class LogoutAPIView(generics.GenericAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def post(self, request, format=None):
		request._auth.delete()
		user_logged_out.send(sender=request.user.__class__, request=request, user=request.user)
		return Response(None, status=status.HTTP_204_NO_CONTENT)


class UserAPIView(generics.RetrieveUpdateAPIView):
	permission_classes = (IsAuthenticated,)
	serializer_class = UserSerializer

	def retrieve(self, request, *args, **kwargs):
		serializer = self.serializer_class(request.user)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		serializer = self.serializer_class(request.user, data=request.data, partial=True)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_200_OK)