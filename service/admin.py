from django.contrib import admin
from .models import Service, Category, ServiceImage
from django.contrib.gis.db import models
from mapwidgets.widgets import GooglePointFieldWidget

class ServiceAdmin(admin.ModelAdmin):
	formfield_overrides = {
		models.PointField: {"widget": GooglePointFieldWidget}
	}

admin.site.register(Service, ServiceAdmin)
admin.site.register(ServiceImage)
admin.site.register(Category)