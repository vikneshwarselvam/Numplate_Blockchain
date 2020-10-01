import cv2
import pytesseract
import os
import re
import requests
from datetime import date

from datetime import datetime

os.chdir("cropped/")
img_list = os.listdir()
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
url = 'http://127.0.0.1:5000/createTransactions'

today = date.today()

# dd-mm-YY
date = today.strftime("%d-%m-%Y")
print("date =", date)



now = datetime.now()

current_time = now.strftime("%H:%M")
print("Current Time =", current_time)

for img in img_list:
    image = cv2.imread(img)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    resized = cv2.resize(gray, (300, 50), interpolation=cv2.INTER_CUBIC)    
    dn_gray = cv2.fastNlMeansDenoising(resized, templateWindowSize=7, h=25)
    gray_bin = cv2.threshold(dn_gray, 80, 255, cv2.THRESH_BINARY)[1]
    txt = pytesseract.image_to_string(gray_bin)
    if((len(txt) > 0)and (txt[0].isdigit())):
        txt = txt[1:]
    result = re.sub('[\W_]+', '', txt) # RegEx to remove all chars that are not alpha/numeric
    result = ''.join(ch for ch in result if (ch.isupper() or ch.isnumeric()))
    cv2.imshow("Detection", gray_bin)
    
    myobj = { 
        "numplate": result,
        "tollgate_location": "Tada Toll Plaza",
        "transaction_date": date,
        "transaction_time": current_time,
        "toll_tariff": "50"
        }
    x = requests.post(url, json = myobj)

    #print(x.text)
    print(result)
    print("Press any key")
    cv2.waitKey()
