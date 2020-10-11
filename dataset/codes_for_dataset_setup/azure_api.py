import json
import requests
import time
import os

def azure_api_call(image_path):
    endpoint="https://2020answerlyminorproject.cognitiveservices.azure.com/"
    subscription_key="c46df8cef6ae42e3a72fde64fdc5f6d6"
    text_recognition_url = endpoint + "/vision/v3.0/read/analyze"
    headers = {'Ocp-Apim-Subscription-Key': subscription_key, 'Content-Type': 'application/octet-stream'}
    params={'language':'en','detectOrientation':'true'}
    image_data=open(image_path,"rb").read()
    response=requests.post(text_recognition_url,headers=headers,params=params,data=image_data)
    operation_url = response.headers["Operation-Location"]
    headers = {'Ocp-Apim-Subscription-Key': subscription_key}
    analysis={}
    poll=True
    while(poll):
        response_final=requests.get(operation_url,headers=headers)
        analysis=response_final.json()
        print(json.dumps(analysis,indent=4))
        time.sleep(1)
        if ("analyzeResult" in analysis):
            poll = False
        if ("status" in analysis and analysis['status'] == 'failed'):
            poll = False
    return analysis    
def show_result(json_file):
    lines=json_file['analyzeResult']['readResults'][0]['lines']
    for line in lines:
        print(line['text'],"\n")

starting_point="D:/Github_Projects/Answerly/dataset"
ending_point="D:/Github_Projects/Answerly/dataset/ocr_results"

for question_paper in os.listdir(starting_point):
    if question_paper != "ocr_results":
        level_1=starting_point+'/'+question_paper
        for question_number in os.listdir(level_1):
            level_2=level_1+'/'+question_number
            if(os.path.isdir(level_2)):
                for paper_number in os.listdir(level_2):
                    level_3=level_2+'/'+paper_number
                    new_dir_1=ending_point+'/'+question_paper+'/'+question_number+'/'+paper_number
                    os.makedirs(new_dir_1)
                    for image_number in os.listdir(level_3):
                        image_path=level_3+'/'+image_number
                        new_dir_2=new_dir_1+'/'+image_number[0]+'.json'
                        api_json_file=azure_api_call(image_path=image_path)
                        with open(new_dir_2,'w') as out_file:
                            json.dump(api_json_file,out_file,indent=4)
show_result(api_json_file)
print('\n','Code Completed!!!!')
