from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, Permission, PermissionsMixin,)
from django.db import models


class UserManager(BaseUserManager):
	def create_user(self, phone, name, company, password=None, is_staff=False, is_active=True, **extra_fields):
		"""
		Create a user instance with the given phone and password
		"""
		user = self.model(phone=phone, name=name, company=company, is_staff=is_staff, is_active=is_active, **extra_fields)
		if password:
			user.set_password(password)
		user.save()
		return user

	def create_superuser(self, phone, password=None, **extra_fields):
		user = self.model(phone=phone, is_staff=True, is_active=True, is_superuser=True, **extra_fields)
		if password:
			user.set_password(password)
		user.save()
		return user


class User(PermissionsMixin, AbstractBaseUser):
	phone = models.CharField(max_length=20, unique=True, blank=False)
	email = models.EmailField(unique=True, null=True)
	name = models.CharField(max_length=128, blank=False)
	company = models.CharField(max_length=128, blank=False)
	phone_verified = models.BooleanField(default=False)
	id_verified = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)

	class Meta:
		verbose_name = 'user'
		verbose_name_plural = 'users'

	USERNAME_FIELD = 'phone'

	objects = UserManager()

	def get_short_name(self):
		return self.name

	def natural_key(self):
		return self.phone

	def __str__(self):
		return self.name