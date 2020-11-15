from django.urls import path
from . import views
urlpatterns=[
    path('ml_model', views.home, name='ml_model'),
    path('data', views.update_data,name='data'),
    path('', views.homepage, name='homepage'),
    path('temp', views.temp, name='temp'),
    path('train_model',views.train_model_1, name='train_model')
]
