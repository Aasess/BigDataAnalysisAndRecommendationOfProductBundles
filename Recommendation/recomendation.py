from ProductBundleRecommendation import settings
import json
import random
from .views import product_bundles_lists

def getPureData(prodName):
    
    '''sort the bigram frequencies in descending order, 
       then return merely the corresponding product names in the same order'''
    
    if prodName not in product_bundles_lists:
        return []
    sortedOringalList = sorted(product_bundles_lists[prodName].items(), key=lambda x: x[1], reverse=True)
#     print(sortedOringalList)
    data = {}
    for tp in sortedOringalList:
        product = tp[0]
        number = tp[1]
        if number in data:
            productList = data[number]
            productList.append(product)
        else:
            productList = [product]
        data[number] = productList
#     print(data)
#     print("==> Get pure data name:")
    pureData = data.values()
#     print(pureData)
    return list(pureData)

def pickRecommendProds(pureData, numberOfRecommend):
    
    '''Pick certain number of products from the sorted product names'''
    
    recommendProds = []
    for prods in pureData:
        if len(prods) <= numberOfRecommend:
            recommendProds += prods
            numberOfRecommend -= len(prods)
        else:
            recommendProds += random.sample(prods, numberOfRecommend)
            numberOfRecommend = 0

        if numberOfRecommend == 0:
            break
    
    return recommendProds

# recommend products bought together with 'name'
# name: the product to start with
def getRecommend(name, numberOfRecommend):
    
    '''Recommend certain number of products bought after the given input name'''
    recommendProducts = []
    productName = name
    index = 0

    while (numberOfRecommend):
#         print("->Target: ", productName)
#         print("->numberOfRecommend: ", numberOfRecommend)
#         print("->Index: ", index)
        data = getPureData(productName)
    #     print("Pure data:", data)
        intermediate = pickRecommendProds(data, numberOfRecommend)
        recommendProducts += intermediate
#         print("Recommend: ", recommendProducts)
#         print("Recommend: ", recommendProducts)
        if len(intermediate) == 0 and index == len(recommendProducts):
            break
        numberOfRecommend -= len(intermediate)
        if numberOfRecommend > 0:
#             print("Still left: ", numberOfRecommend)
            productName = recommendProducts[index]
            index += 1

#         print("==================")

    return recommendProducts
