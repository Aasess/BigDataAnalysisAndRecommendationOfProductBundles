from django.shortcuts import render,redirect
import json
from . import recomendation

# Create your views here.

# index page
def index(request):
    #get the topproductsbundles 
    topproductbundles=recomendation.topproductbundledetails()

    #lets combine the no. and record using zip() and pass through dict
    i= range(len(topproductbundles))
    topproductbundles=topproductbundles
    zippedBundles = zip(i,topproductbundles)
    context ={
        'zippedBundles':zippedBundles,
    }
    return render(request,'Recommendation/index.html',context)

#search tab get approach
def productsearch(request):
     #get the topproductsbundles 
    topproductbundles=recomendation.topproductbundledetails()

    #lets combine the no. and record using zip() and pass through dict
    i= range(len(topproductbundles))
    topproductbundles=topproductbundles
    zippedBundles = zip(i,topproductbundles)

    if request.GET.get("recom") and request.GET.get("product_name"):
        Num_of_recom = request.GET["recom"]
        product_name = request.GET["product_name"]
        print(Num_of_recom + product_name)
        recommendproducts = recomendation.getRecommend("Homestyle_Corned_Beef_Hash", 2)
        print(recommendproducts)
        return redirect('homepage')
    else:
        context ={
            'zippedBundles':zippedBundles,
            'error_get':"Please specify the product name"
        }
        return render(request,'Recommendation/index.html',context)