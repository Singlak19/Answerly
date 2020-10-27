from django.shortcuts import render
# from .models import UserModel
from .models import UserModel
from django.http import JsonResponse
from src.model_training.azure_api_call import get_text
from src.model_training.model import get_parameters, train_model
import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
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
def home(request):
    if request.method=='GET':
        firebase_unique_id=request.GET['firebase_unique_id']
        file_location='model_uploads'+'/'+firebase_unique_id+'.pickle'
        f=open(file_location, 'rb')
        regressor=pickle.load(f)
        f.exit()
        url=request.GET['url']
        ideal_answer=request.GET['ideal_answer']
        X=np.array(get_parameters(get_text(url),ideal_answer)).reshape(1,-1)
        poly=PolynomialFeatures(degree=3)
        X=poly.transform(X)
        ans=regressor.predict(X)
        return JsonResponse({'ans':ans})
    else:
        firebase_unique_id=request.GET['firebase_unique_id']
        dataset=pd.read_csv('csv_files/'+firebase_unique_id+'.csv')
        X=np.array(dataset.iloc[:][:2])
        y=np.array(dataset.iloc[:][-1]).reshape(1,-1)
        regressor=train_model(X,y)
        file_location='model_uploads'+'/'+firebase_unique_id+'.pickle'
        pickle.dump(regressor,open(file_location,'wb'))
        return JsonResponse({'Status':'Model_trained'})
def update_data(request):
    firebase_unique_id=request.GET['firebase_unique_id']
    urls=request.GET['links']
    ideal_answer=request.GET['ideal_answer']
    dataset_temp=[]
    y_values=request.GET['y_values']
    for i in range(0,len(urls)):
        my_answer=get_text(urls[i])
        temp=get_parameters(my_answer,ideal_answer)
        temp.append(y_values[i])
        dataset_temp.append(temp)
    if os.path.exists('csv_files/'+firebase_unique_id+'.csv'):
        dataset=pd.read_csv('csv_files/'+firebase_unique_id+'.csv')
        dataset_temp=pd.DataFrame(np.array(dataset_temp),columns=['k','g','y'])
        dataset=dataset.append(dataset_temp, ignore_index=True)
        os.remove('csv_files/'+firebase_unique_id+'.csv')
    else:
        dataset=pd.DataFrame(np.array(dataset_temp),columns=['k','g','y'])
    dataset.to_csv('csv_files/'+firebase_unique_id+'.csv')
    return JsonResponse({'status':'Successfullly Updated'})
