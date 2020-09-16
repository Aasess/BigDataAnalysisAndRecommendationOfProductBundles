from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib import auth

# Create your views here.
def Register(request):
    if request.method == 'POST':
        firstname = request.POST["firstname"]
        lastname = request.POST["lastname"]
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        repassword=request.POST["re-password"]

        if(password == repassword):
            try:
                User.objects.get(username = request.POST['username'])
                return redirect('homepage')

            except User.DoesNotExist:
                user = User.objects.create_user(username=username,password = password, email = email,first_name=firstname,last_name=lastname)
                auth.login(request,user)
                return redirect("homepage")
        

def Login(request):
    pass

def Logout(request):
    auth.logout(request)
    return redirect('homepage')