from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from ProductBundleRecommendation.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from .models import Order

# Create your views here.
@login_required(login_url='/account/login/')
def checkout(request):
    if request.method == 'POST':
        name = request.POST["name"]
        email = request.POST["email"]
        address = request.POST["address"]
        city = request.POST["city"]
        province = request.POST["province"]
        zipcode = request.POST["zip"]
        print(email)
        obj = Order(name=name,email=email,address=address,city=city,province=province,zipcode=zipcode)
        obj.save();
        send_mail("Your Instacart order has received!", "Thank you for your order", EMAIL_HOST_USER, [email],fail_silently=False)
        return render(request,'Checkout/order_success.html',{'recepient':email,'order_id':obj.id })
    else:
        
        return render(request,'Checkout/checkout.html')