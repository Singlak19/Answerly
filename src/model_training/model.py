import dataset_function
import pandas as pd
import numpy as np
import math
from fuzzywuzzy import fuzz
from sklearn.model_selection import train_test_split
from similarity_function import givKeywordsValue as keywordval
from sklearn.naive_bayes import GaussianNB
answer_sheets=dataset_function.load_training_dataset()
ideal_answers=dataset_function.get_ideal_answers()
question_codes=dataset_function.get_question_codes()
available_question_codes=list(ideal_answers["question_code"])
answer_sheets.head()
answer_sheets=answer_sheets[answer_sheets["question_code"].isin(available_question_codes)]
set(answer_sheets["question_code"])
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
