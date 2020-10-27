from django.db import models

# Create your models here.
# class UserModel(models.Model):
#     firebase_authentication_id=models.CharField(max_length=200)
#     file_location=models.CharField(max_length=200)

class UserModel(models.Model):
    firebase_authentication_id=models.CharField(max_length=200)
    file_location=models.CharField(max_length=200)
    csv_file_location=models.CharField(max_length=200)
