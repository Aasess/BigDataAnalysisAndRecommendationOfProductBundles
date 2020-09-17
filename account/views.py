from django.shortcuts import render,redirect
from django.template.loader import render_to_string
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import auth
from .forms import UserCreationForm
import json

# Create your views here.
def Register(request):
    # if request.method == 'POST':
    #     firstname = request.POST["firstname"]
    #     lastname = request.POST["lastname"]
    #     username = request.POST["username"]
    #     email = request.POST["email"]
    #     password = request.POST["password"]
    #     repassword=request.POST["re-password"]

    #     if(password == repassword):
    #         try:
    #             User.objects.get(username = request.POST['username'])
    #             return render(request,"Recommendation/index.html",{'error':"username already exists!!!"})

    #         except User.DoesNotExist:
    #             user = User.objects.create_user(username=username,password = password, email = email,first_name=firstname,last_name=lastname)
    #             auth.login(request,user)
    #             return redirect("homepage")
    
    if request.method == "POST":
        result = request.body
        #decode the byte into string
        result = result.decode("utf-8")
        #convert string into python dict
        result = json.loads(result)
        print(result)
        form = UserCreationForm(result)
        if form.is_valid():
            user = form.save(commit=False)
            user.username=result["email"]
            user.save()
            print(user.id)
            auth.login(request,user)
            return JsonResponse({'success':True})
    
    else:
        form = UserCreationForm()
    
    context = {'form':form}
    html_form = render_to_string('account/partial_user_registration.html',context,request=request)
    return JsonResponse({'html_form':html_form})

def Login(request):
    pass

def Logout(request):
    auth.logout(request)
    return redirect('homepage')