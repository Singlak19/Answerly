import os,pathlib
from pdf2image import convert_from_path
dir_list=os.listdir()
where_to_save="E:/Github/Answerly/dataset"
level_1=""
level_2=""
for question_paper in dir_list:
    if os.path.isdir(question_paper):
        level_1=where_to_save+'/'+question_paper[-5:]
        dir_list_2=os.listdir(question_paper)
        for question_number in dir_list_2:
            if os.path.isdir(question_paper+'/'+question_number):
                level_2=level_1+'/'+question_number
                dir_list_3=os.listdir(question_paper+'/'+question_number)
                for pdf_file in dir_list_3:
                    images=convert_from_path(question_paper+'/'+question_number+'/'+pdf_file)
                    s=""
                    if len(pdf_file)==5:
                        s=pdf_file[0:1]
                    else:
                        s=pdf_file[0:2]
                    os.makedirs(level_2+'/'+s)
                    count=0
                    for image in images:
                        image.save(fp=pathlib.Path(level_2+'/'+s+'/'+str(count)+'.jpeg'))
                        count+=1