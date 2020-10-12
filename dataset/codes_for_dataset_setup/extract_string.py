import os
import json
starting_folder="D:/Github_Projects/Answerly/dataset/ocr_results"
ending_folder="D:/Github_Projects/Answerly/dataset/extracted_text"
for question_paper in os.listdir(starting_folder):
    level_1=starting_folder+'/'+question_paper
    for question_number in os.listdir(level_1):
        level_2=level_1+'/'+question_number
        destination_0=ending_folder+'/'+question_paper+'/'+question_number
        os.makedirs(destination_0)
        for paper_number in os.listdir(level_2):
            level_3=level_2+'/'+paper_number
            file_object_path=destination_0+'/'+paper_number+".txt"
            text_file_object=open(file_object_path,"w")
            for page_number in os.listdir(level_3):
                # print(level_3+'/'+page_number)
                json_file_object=open(level_3+'/'+page_number)
                json_file=json.load(json_file_object)
                lines=json_file['analyzeResult']['readResults'][0]['lines']
                for line in lines:
                    text_file_object.write(line['text']+" ")
                json_file_object.close()
            text_file_object.close()
print("Code Completed!!")
