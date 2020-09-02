from django.shortcuts import render
from ProductBundleRecommendation import settings
import json

# Create your views here.
def index(request):
    topproductbundles = []
    #first convert the json file from the path specified to python dict
    path = settings.BASE_DIR / 'data.json'
    with open(path) as f:
        product_bundles_lists = json.load(f)

    #lets find the top product bundles based on bigram frequency that was saved to data.json
    for firstWord in product_bundles_lists:
        for secondWord in product_bundles_lists[firstWord]:
            if product_bundles_lists[firstWord][secondWord] > 20:           
                topproductDict = {
                    "firstproduct" : firstWord,
                    "secondproduct" : secondWord,
                    "frequency" : product_bundles_lists[firstWord][secondWord]
                }
                topproductbundles.append(topproductDict)
    
    #lets combine the no. and record using zip() and pass through dict
    i= range(len(topproductbundles))
    topproductbundles=topproductbundles
    zippedBundles = zip(i,topproductbundles)
    
    context ={
        'zippedBundles':zippedBundles
    }
    return render(request,'Recommendation/index.html',context)