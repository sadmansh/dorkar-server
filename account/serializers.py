from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password


class CreateUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'phone', 'name', 'company', 'password',)
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['phone'], validated_data['name'], validated_data['company'], validated_data['password'])
		return user


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'phone', 'name', 'company', 'phone_verified', 'id_verified',)

	def update(self, instance, validated_data):
		for (key, value) in validated_data.items():
			print(key)
			if value is not None:
				setattr(instance, key, value)
		instance.save()
		return instance


class UserLoginSerializer(serializers.Serializer):
	phone = serializers.CharField()
	password = serializers.CharField()

	def validate(self, data):
		user = authenticate(**data)
		print(user)
		if user and user.is_active:
			return user
		raise serializers.ValidationError('Unable to login with provided credentials.')