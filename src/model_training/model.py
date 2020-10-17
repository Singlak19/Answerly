from azure_api_call import get_text
t=get_text("https://firebasestorage.googleapis.com/v0/b/answerly-17371.appspot.com/o/1602957333879-1.pdf?alt=media&token=e8a61b5e-e0f5-4818-8375-e4775bf7c131")
print(t)






# import pandas as pd
# import numpy as np
# import dataset_function
# import os
# from rake_nltk import Rake
# X,y=dataset_function.load_training_dataset()
# question_codes= dataset_function.get_question_codes()
# print("Hello World!!!")
# X.head()
# ideal_answers=dataset_function.get_ideal_answers()
# question_code=8
# X=X[X["question_code"]==question_code]
# y=y[y["question_code"]==question_code]
# ideal_answer=ideal_answers[ideal_answers["question_code"]==question_code]["text"].iloc[0]
# from sklearn.model_selection import train_test_split
# X_train, X_test, y_train, y_test=train_test_split(X,y,test_size=0.2)
# ideal_answer=ideal_answer.lower()
# import nltk
# tokenized_ideal_answer=nltk.word_tokenize(ideal_answer,preserve_line=True)
# WNlemma=nltk.WordNetLemmatizer()
# lemmatized_ideal_answer=[WNlemma.lemmatize(t) for t in tokenized_ideal_answer]
# lemmatized_ideal_answer_1=[WNlemma.lemmatize(t) for t in lemmatized_ideal_answer]
# r=Rake(language='english')
# r.extract_keywords_from_sentences(lemmatized_ideal_answer)
# p=nltk.PorterStemmer()
# stemmed_ideal_answer=[p.stem(t) for t in tokenized_ideal_answer]
# r_1=Rake()
# r_1.extract_keywords_from_sentences(stemmed_ideal_answer)
