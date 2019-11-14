from django.utils.encoding import smart_text
from text_unidecode import unidecode
from django.contrib.gis.db import models
from django.utils.text import slugify
from account.models import User
from versatileimagefield.fields import PPOIField, VersatileImageField


class Category(models.Model):
	name = models.CharField(max_length=255)
	slug = models.SlugField(max_length=255, unique=True, blank=True, null=False)
	description = models.TextField(blank=True)
	parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
	image = VersatileImageField(upload_to='images/category-backgrounds', blank=True, null=True)

	objects = models.Manager()

	class Meta:
		verbose_name_plural = 'categories'

	def generate_unique_slug(self):
		slug = slugify(self.name)
		unique_slug = slug
		num = 1
		while Category.objects.filter(slug=unique_slug).exists():
			unique_slug = '{}-{}'.format(slug, num)
			num += 1
		return unique_slug

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = self.generate_unique_slug()
		super().save(*args, **kwargs)

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse('service:category', kwargs={'slug': self.slug, 'category_id': self.id})


class Service(models.Model):
	title = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	keywords = models.TextField(blank=True)
	location = models.PointField()
	phone = models.CharField(max_length=20, blank=False)
	date_added = models.DateTimeField(auto_now_add=True)
	date_modified = models.DateTimeField(auto_now=True, null=True)
	category = models.ForeignKey(Category, related_name='services', on_delete=models.CASCADE)
	user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)

	def __str__(self):
		return self.title

	def get_absolute_url(self):
		return reverse('service:details', kwargs={'slug': self.get_slug(), 'service_id': self.id})

	def get_slug(self):
		return slugify(smart_text(unidecode(self.title)))


class ServiceImage(models.Model):
	service = models.ForeignKey(Service, related_name='images', on_delete=models.CASCADE)
	image = VersatileImageField(upload_to='images/services', ppoi_field='ppoi', blank=True)
	ppoi = PPOIField()
	alt = models.CharField(max_length=255, blank=True, null=True)

	def __str__(self):
		return self.service.title