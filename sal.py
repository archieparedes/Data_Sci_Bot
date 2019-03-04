"""
@author Archie_Paredes
@created JAN 26, 2018
@version 1.0
Indeed - Salary puller
"""
import sys
#import csv
import re
import requests
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen as ur
from urllib.parse import urljoin

# testing
# print(sys.argv[1])
# print(sys.argv[2])
# file = open("test.txt", 'w')
# file.write(sys.argv[1] + " " + sys.argv[2] + " size:" + str(len(sys.argv)))
# file.close() 

if(len(sys.argv) == 3):
    url = "https://www.indeed.com/jobs?q={}+{}&l=".format(sys.argv[1], sys.argv[2])
elif(len(sys.argv) == 2):
    url = "https://www.indeed.com/jobs?q={}&l=".format(sys.argv[1])
elif(len(sys.argv) == 4):
    url = "https://www.indeed.com/jobs?q={}+{}+{}&l=".format(sys.argv[1], sys.argv[2], sys.argv[3])
else:
    raise Exception('Invalid job title')
    

uClient = ur(url)
pageText = uClient.read()
uClient.close()
pageSoup = bs(pageText, "html.parser")

avg = pageSoup.find(attrs={"id": "univsrch-salary-currentsalary"})
minimum = pageSoup.find(attrs={"class": "univsrch-sal-min univsrch-sal-caption float-left"})
maximum = pageSoup.find(attrs={"class": "univsrch-sal-max univsrch-sal-caption float-right"})

avgAmount = ""
minAmount = ""
maxAmount = ""

print("Avg",avg.text)
print(maximum.text)
print(minimum.text)

# for i in avg.text:
#     if(i.isdigit()):
#         avgAmount += i
# for i in minimum.text:
#     if(i.isdigit()):
#         minAmount += i
# for i in maximum.text:
#     if(i.isdigit()):
#         maxAmount += i

# with open('sal.csv', 'w+', newline = '') as csv_file:
#     writer = csv.writer(csv_file)
#     writer.writerow(["Minimum", minAmount])
#     writer.writerow(["Average", avgAmount])
#     writer.writerow(["Maximum", maxAmount])
    
# print("Average: {}\nMinimum: {}\nMaximum: {}".format(avgAmount, minAmount, maxAmount))
