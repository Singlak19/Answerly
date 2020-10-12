my_dict={"14103_Q1":0,"14103_Q2":1,"14103_Q3":2,"14103_Q4":3,"14103_Q5":4,"14103_Q6":5,"14103_Q7":6,"14103_Q11":7,"15103_Q1":8,"15103_Q2":9,"15103_Q3":10,"15103_Q4":11,"15103_Q5":12,"15103_Q6":13}
def load_training_dataset():
    import pandas as pd
    import os
    starting_point="../extracted_text"
    text_values=[]
    question_codes=[]
    y_values=[]
    y_14103_values=pd.read_csv("../14103/14103.csv")
    y_15103_values=pd.read_csv("../15103/15103.csv")
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
    y_values=pd.Series(y_values)
    return text_values,y_values

def get_question_codes():
    return my_dict

X,y=load_training_dataset()