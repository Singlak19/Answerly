my_dict={"14103_Q1":0,"14103_Q2":1,"14103_Q3":2,"14103_Q4":3,"14103_Q5":4,"14103_Q6":5,"14103_Q7":6,"14103_Q11":7,"15103_Q1":8,"15103_Q2":9,"15103_Q3":10,"15103_Q4":11,"15103_Q5":12,"15103_Q6":13}
out_of={0:10,1:5,2:10,3:10,4:5,5:5,6:5,7:10,8:10,9:10,10:5,11:5,12:5,13:10}
def load_training_dataset():
    import pandas as pd
    import os
    starting_point="dataset/extracted_text"
    text_values=[]
    question_codes=[]
    y_values=[]
    y_14103_values=pd.read_csv("dataset/14103/14103.csv")
    y_15103_values=pd.read_csv("dataset/15103/15103.csv")
    for question_paper in os.listdir(starting_point):
        if question_paper=="14103" or question_paper=="15103":
            level_1=starting_point+'/'+question_paper
            for question_number in os.listdir(level_1):
                level_2=level_1+'/'+question_number
                if os.path.isdir(level_2):
                    for paper_number in os.listdir(level_2):
                        final_directory=level_2+'/'+paper_number
                        f=open(final_directory)
                        k=f.read()
                        text_values.append(str(k))
                        question_codes.append(my_dict[question_paper+'_'+question_number])
                        f.close()
                        if(len(paper_number)==6):
                            paper_number=paper_number[:2]
                        else:
                            paper_number=paper_number[:1]
                        if question_paper=="14103":
                            y_values.append(y_14103_values[question_number].iloc[int(paper_number)-1])
                        else:
                            y_values.append(y_15103_values[question_number].iloc[int(paper_number)-1])

    text_values=pd.DataFrame(text_values,columns=["text"])
    text_values["question_code"]=question_codes
    text_values["marks"]=y_values
    return text_values

def get_question_codes():
    return my_dict

def get_ideal_answers():
    import pandas as pd
    import os
    text=[]
    starting_point="dataset/ideal_answers"
    for answer in os.listdir(starting_point):
        if answer!="14103_Q1":
            f=open(starting_point+'/'+answer, encoding="utf8")
            text.append([f.read(),my_dict[answer[:-4]]])
        # answer[:-4] <- This this the question_number
    return pd.DataFrame(text, columns=["text","question_code"])

def get_out_of_ansers():
    return out_of
