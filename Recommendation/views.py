from django.shortcuts import render
import json
from . import recomendation


# Create your views here.
def index(request):
    #get the topproductsbundles 
    topproductbundles=recomendation.topproductbundledetails()
    
    #lets combine the no. and record using zip() and pass through dict
    i= range(len(topproductbundles))
    topproductbundles=topproductbundles
    zippedBundles = zip(i,topproductbundles)
    
    context ={
        'zippedBundles':zippedBundles
    }
    return render(request,'Recommendation/index.html',context)

