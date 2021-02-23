from django.db import models

# Create your models here.
class Order(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    zipcode= models.CharField(max_length=200)

