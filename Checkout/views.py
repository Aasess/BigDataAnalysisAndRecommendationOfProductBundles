from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='/account/login/')
def checkout(request):
    return render(request,'Checkout/checkout.html')