from django.contrib import admin
from .models import Order

# Register your models here.
#admin.site.register(Order)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id","name", "email", "address","city","province","zipcode")