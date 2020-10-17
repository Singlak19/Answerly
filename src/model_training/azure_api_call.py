def ocr_azure():
    import json
    import time
    import requests
    image=open("temp.jpeg","rb").read()
    endpoint="https://2020answerlyminorproject.cognitiveservices.azure.com/"
    subscription_key="c46df8cef6ae42e3a72fde64fdc5f6d6"
    text_recognition_url = endpoint + "/vision/v3.0/read/analyze"
    params={'language':'en','detectOrientation':'true'}
    headers = {'Ocp-Apim-Subscription-Key': subscription_key, 'Content-Type': 'application/octet-stream'}
    response=requests.post(text_recognition_url,params=params,headers=headers,data=image)
    response.raise_for_status()
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
#
def get_text(pdfURL):
    from pdf2image import convert_from_path
    import requests
    r=requests.get(pdfURL)
    with open("temp.pdf","wb") as f:
        f.write(r.content)
    images=convert_from_path("temp.pdf")
    ocr_text=""
    for temp_image in images:
        temp_image.save("temp.jpeg")
        json_file=ocr_azure()
        lines=json_file['analyzeResult']['readResults'][0]['lines']
        for line in lines:
            ocr_text=ocr_text+line['text']
    return ocr_text
# pdfURL="https://firebasestorage.googleapis.com/v0/b/answerly-17371.appspot.com/o/1602957333879-1.pdf?alt=media&token=e8a61b5e-e0f5-4818-8375-e4775bf7c131"
# from pdf2image import convert_from_path
# import requests
# import json
# r=requests.get(pdfURL)
# with open("temp.pdf","wb") as f:
#     f.write(r.content)
# images=convert_from_path("temp.pdf")
# ocr_text=""
# images[0].save("temp.jpeg")
# image1=open("temp.jpeg","rb").read()
# endpoint="https://2020answerlyminorproject.cognitiveservices.azure.com/"
# subscription_key="c46df8cef6ae42e3a72fde64fdc5f6d6"
# text_recognition_url = endpoint + "/vision/v3.0/read/analyze"
# params={'language':'en','detectOrientation':'true'}
# headers = {'Ocp-Apim-Subscription-Key': subscription_key, 'Content-Type': 'application/octet-stream'}
# response=requests.post(text_recognition_url,params=params,headers=headers,data=image1)
# response.raise_for_status()
# operation_url = response.headers["Operation-Location"]
# headers = {'Ocp-Apim-Subscription-Key': subscription_key}
# analysis={}
# poll=True
# while(poll):
#     response_final=requests.get(operation_url,headers=headers)
#     analysis=response_final.json()
#     print(json.dumps(analysis,indent=4))
#     time.sleep(1)
#     if ("analyzeResult" in analysis):
#         poll = False
#     if ("status" in analysis and analysis['status'] == 'failed'):
#         poll = False
