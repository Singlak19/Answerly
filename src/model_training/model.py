from . import dataset_function
import pandas as pd
import numpy as np
import math
from fuzzywuzzy import fuzz
from sklearn.model_selection import train_test_split
from .similarity_function import givKeywordsValue as keywordval
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import LinearRegression



def get_parameters(answer, ideal_answer):
    return [keywordval(answer,ideal_answer), fuzz.token_set_ratio(answer, ideal_answer)]

def train_model(X,y):
    poly=PolynomialFeatures(degree=3)
    X_train_poly=poly.fit_transform(X)
    regressor=LinearRegression().fit(X_train_poly, y)
    return regressor



answer_sheets=dataset_function.load_training_dataset()
ideal_answers=dataset_function.get_ideal_answers()
question_codes=dataset_function.get_question_codes()
out_of=dataset_function.get_out_of_ansers()
available_question_codes=list(ideal_answers["question_code"])
# answer_sheets.head()
answer_sheets=answer_sheets[answer_sheets["question_code"].isin(available_question_codes)]
set(answer_sheets["question_code"])
# removed 14103_Q1
#Best Random State: 2
train_answer_sheets, test_answer_sheets=train_test_split(answer_sheets, train_size=0.8, random_state=2)
X=[]
y=[]
for i in range(0,len(train_answer_sheets)):
    temp=train_answer_sheets.iloc[i]["question_code"]
    X.append([keywordval(train_answer_sheets.iloc[i]["text"], ideal_answers[ideal_answers["question_code"]==temp].iloc[0]["text"]), fuzz.token_set_ratio(train_answer_sheets.iloc[i]["text"], ideal_answers[ideal_answers["question_code"]==temp].iloc[0]["text"])])
    y.append((train_answer_sheets.iloc[i]["marks"]/out_of[temp])*10)
poly=PolynomialFeatures(degree=3)
X_train_poly=poly.fit_transform(X)
X_train_poly
regressor=LinearRegression().fit(X_train_poly, y)
X_test=[]
y_test=[]
for i in range(0,len(test_answer_sheets)):
    temp=test_answer_sheets.iloc[i]["question_code"]
    X_test.append([keywordval(test_answer_sheets.iloc[i]["text"], ideal_answers[ideal_answers["question_code"]==temp].iloc[0]["text"]), fuzz.token_set_ratio(test_answer_sheets.iloc[i]["text"], ideal_answers[ideal_answers["question_code"]==temp].iloc[0]["text"])])
    y_test.append((test_answer_sheets.iloc[i]["marks"]/out_of[temp])*10)
X_test_poly=poly.transform(X_test)
y_pred=regressor.predict(X_test_poly)
# y_pred=[round(number, 0) for number in y_pred]
# y_test=[round(number, 0) for number in y_test]
from sklearn.metrics import mean_squared_error
error=mean_squared_error(y_pred=y_pred, y_true=y_test)
print("Random State: ", 2, ", Error: ", math.sqrt(error))
jj=poly.transform(np.array([1,2]).reshape(1,-1))
jj
regressor.predict(jj)
# type(ideal_answers[ideal_answers["question_code"]==8].iloc[0]["text"])
# print(my_ideal_answer)
# selected_answer_sheets=answer_sheets[answer_sheets["question_code"]==question_code]["text"]
# # selected_answer_sheets.head()
# type(selected_answer_sheets)
# # y_values.head()
# type(my_ideal_answer)
# selected_y_values=y_values[y_values["question_code"]==question_code]["marks"]
# # selected_y_values.head()
# selected_answer_sheets=np.array(selected_answer_sheets)
# selected_y_values=np.array(selected_y_values)
# out_of=5
# raw_data=pd.DataFrame(selected_answer_sheets,columns=["text"])
# raw_data["marks"]=selected_y_values
# raw_data.head()
# train_raw_data, test_raw_data=train_test_split(raw_data, train_size=0.8)
#
# X=[]
# y=[]
# for i in range(0,len(train_raw_data)):
#     X.append([keywordval(train_raw_data.iloc[i]["text"], my_ideal_answer), math.ceil(fuzz.token_set_ratio(train_raw_data.iloc[i]["text"], my_ideal_answer)*6/100)])
#     y.append(train_raw_data.iloc[i]["marks"])
# X
# y
# X=pd.DataFrame(X, columns=["k","q"])
# y=pd.Series(y)
# y=y.apply(lambda x: x*2)
# clf=GaussianNB().fit(X,y)
# X_test=[]
# y_test=[]
# for i in range(0,len(test_raw_data)):
#     X_test.append([keywordval(test_raw_data.iloc[i]["text"], my_ideal_answer), math.ceil(fuzz.token_set_ratio(test_raw_data.iloc[i]["text"], my_ideal_answer)*6/100)])
#     y_test.append(test_raw_data.iloc[i]["marks"])
# y_predicted=clf.predict(X_test)
# y_predicted
# y_test=pd.Series(y_test)
# y_test=y_test.apply(lambda x :x*2)
# y_test
