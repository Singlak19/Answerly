from django.shortcuts import render
# from .models import UserModel
from .models import UserModel
import json
from django.http import JsonResponse, HttpResponse
from src.model_training.azure_api_call import get_text
from src.model_training.model import get_parameters, train_model
import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
import pickle
firebaseConfig = {
    'apiKey': "AIzaSyCS_gMDiPnr4xoBGLcdFfZ8RL_Ff4SmH4k",
    'authDomain': "answerly-17371.firebaseapp.com",
    'databaseURL': "https://answerly-17371.firebaseio.com",
    'projectId': "answerly-17371",
    'storageBucket': "answerly-17371.appspot.com",
    'messagingSenderId': "555938980709",
    'appId': "1:555938980709:web:d4fb0426ec0fdbe5c0778c",
    'measurementId': "G-YHRZYV7RTR"
  };
@csrf_exempt
def home(request):
    if request.method=='POST':
        received_json_data=json.loads(request.body)
        firebase_unique_id=received_json_data['firebase_unique_id']
        file_location='model_uploads'+'/'+firebase_unique_id+'.pickle'
        f=open(file_location, 'rb')
        regressor=pickle.load(f)
        url=received_json_data['url']
        ideal_answer=received_json_data['ideal_answer']
        X=np.array(get_parameters(get_text(url),ideal_answer)).reshape(1,-1)
        poly=PolynomialFeatures(degree=3)
        X=poly.fit_transform(X)
        ans=regressor.predict(X)
        ans=ans[0]
        if ans>10:
            if ans<20:
                ans=ans/2
            else:
                ans=10
        int_ans=int(ans)
        if ans-int_ans>=0.75:
            ans=int_ans+1
        elif ans-int_ans>=0.25:
            ans=int_ans+0.5
        else:
             ans=int_ans
        print("Result: ", ans)
        return JsonResponse({'ans':ans})
@csrf_exempt
def train_model_1(request):
    if request.method=='POST':
        received_json_data=json.loads(request.body)
        firebase_unique_id=received_json_data['firebase_unique_id']
        dataset=pd.read_csv('csv_files/'+firebase_unique_id+'.csv',index_col=0)
        X=dataset[['k','g']]
        y=dataset['y']
        regressor=train_model(X,y)
        file_location='model_uploads'+'/'+firebase_unique_id+'.pickle'
        if(os.path.isfile(file_location)):
            os.remove(file_location)
        pickle.dump(regressor,open(file_location,'wb'))
        return JsonResponse({'Status':'Model_trained'})
@csrf_exempt
def update_data(request):
    received_json_data=json.loads(request.body)
    firebase_unique_id=received_json_data['firebase_unique_id']
    urls=received_json_data['links']
    ideal_answer=received_json_data['ideal_answer']
    dataset_temp=[]
    y_values=received_json_data['y_values']
    y_values=[float(x) for x in y_values]
    for i in range(0,len(urls)):
        my_answer=get_text(urls[i])
        temp=get_parameters(my_answer,ideal_answer)
        temp.append(y_values[i])
        dataset_temp.append(temp)
    if os.path.exists('csv_files/'+firebase_unique_id+'.csv'):
        dataset=pd.read_csv('csv_files/'+firebase_unique_id+'.csv',index_col=0)
        dataset_temp=pd.DataFrame(np.array(dataset_temp),columns=['k','g','y'])
        dataset=dataset.append(dataset_temp, ignore_index=True)
        os.remove('csv_files/'+firebase_unique_id+'.csv')
    else:
        dataset=pd.DataFrame(np.array(dataset_temp),columns=['k','g','y'])
    dataset.to_csv('csv_files/'+firebase_unique_id+'.csv')
    return JsonResponse({'status':'Successfullly Updated'})
def homepage(request):
    return HttpResponse("Welcome to Our Server")

@csrf_exempt
def temp(request):
    received_json_data=json.loads(request.body)
    for x in received_json_data['entry']:
        print(x)
    return JsonResponse({'World':'Hello'})
    # for x in request.body():
    #     print(x)
    # for x in request.POST:
    #     print(x)
    # print(request.POST['entry'])
    # print(received_json_data['entry'])
    # print(request.POST['entry'])
    # print(request.body)
