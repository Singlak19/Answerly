import pyrebase
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
firebase = pyrebase.initialize_app(firebaseConfig)
db=firebase.database()
users=db.get()
users=users.val()
print(users)
for x in users:
    print(users[x],'\n')
len(users)
for x,y in users.items():
    print(x,' : ',y,'\n')
users['PzXYhIJ18BXCUK8iyJSA4noh7y32']['Training_Data']
