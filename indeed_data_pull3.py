"""
@author Archie_Paredes
@created JAN 26, 2018
@version 1.0
Indeed API - URL puller software engineer

**** ONLY ON LINUX ****
"""

# import csv
# import re
# import requests
# from requests_html import HTMLSession
# from bs4 import BeautifulSoup as bs
# from urllib.request import urlopen as ur
# from urllib.parse import urljoin
# import time
# from itertools import tee, islice, chain

import csv
import re
import requests
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen as ur
from urllib.parse import urljoin
import signal, time
from itertools import tee, islice, chain

class TimeoutError (RuntimeError):
    pass

def handler (signum, frame):
    raise TimeoutError()

signal.signal (signal.SIGALRM, handler)

def now_next(some_iterable): # helps with getting previous and next
    items, nexts = tee(some_iterable, 2)
    nexts = chain(islice(nexts, 1, None), [None])
    return zip(items, nexts)

print("Pulling Data")

start = time.time()
tech = {"java":0,"r":0,"python":0, "c#":0,"ruby":0,"algorithms":0,"object oriented":0,"data structures":0,"web framework":0,"node js":0,
	"angular":0,"react":0,"sql":0,"mysql":0,"html":0,"css":0,"redis":0,"amazon web":0,"aws":0,"javascript":0,"linux":0,
	"mongodb":0,"php":0,"rust":0,"scala":0,"swift":0,"android":0,"ios":0,"c":0,"asp":0,"xsl":0,"xml":0,"mvc":0,"silverlight":0,
	"oracle":0,"objective c":0,"meteor":0,"django":0,"bootstrap":0,"drupal":0,"ember":0,"wordpress":0,"net":0,"backbone":0,"cordova":0,
	"ionic":0,"jquery":0,"underscore":0,"postgresql":0,"postgre":0,"rest":0,"json":0,"csv":0,"api":0,"rspec":0,"vue":0,"git":0,"cloud":0,
	"pl":0,"visual basic":0,"delphi":0,"maven":0,"junit":0,"derby":0,"lucene":0,"salesforce":0,"phpunit":0,"nunit":0,"dbunit":0,"selenium":0,
	"sqlite":0,"microsoft office":0,"unix":0,"bi":0,"api":0}

techFound = {"java":False,"r":False,"python":False, "c#":False,"ruby":False,"algorithms":False,"object oriented":False,"data structures":False,"web framework":False,"node js":False,
	"angular":False,"react":False,"sql":False,"mysql":False,"html":False,"css":False,"redis":False,"amazon web":False,"aws":False,"javascript":False,"linux":False,
	"mongodb":False,"php":False,"rust":False,"scala":False,"swift":False,"android":False,"ios":False,"c":False,"asp":False,"xsl":False,"xml":False,"mvc":False,"silverlight":False,
	"oracle":False,"objective c":False,"meteor":False,"django":False,"bootstrap":False,"drupal":False,"ember":False,"wordpress":False,"net":False,"backbone":False,"cordova":False,
	"ionic":False,"jquery":False,"underscore":False,"postgresql":False,"postgre":False,"rest":False,"json":False,"csv":False,"api":False,"rspec":False,"vue":False,"git":False,"cloud":False,
	"pl":False,"visual basic":False,"delphi":False,"maven":False,"junit":False,"derby":False,"lucene":False,"salesforce":False,"phpunit":False,"nunit":False,"dbunit":False,"selenium":False,
	"sqlite":False,"microsoft office":False,"unix":False,"bi":False,"api":False}

linkCount = 0
url = "https://www.indeed.com/jobs?q=software+engineer&start="
links = list()
titles = list()
companies = list()
for i in range (0,16): 
    try: # for error 404s
        url += "{}0".format(i) # reinitialize url with page number
        print("page: ", url)

        signal.alarm(5)
        try:
            res = requests.get(url)
        except:
            signal.alarm(0)
            continue
        signal.alarm(0)

        soup = bs(res.content, "lxml")
        t1 = soup.select('[data-tn-element="jobTitle"]')
        t2 = soup.findAll("div", {"class": "location"})
        t3 = soup.findAll("span", {"class": "company"})

        for link, loc, comp in zip(t1,t2,t3):
            absolute_link = urljoin(url,link.get("href"))
            company = comp.text.strip()
            title = link.get("title")
            location = loc.text
            if(company in companies and title in titles): # get rids of duplicate/spam job posting
                continue
            titles.append(title)
            companies.append(company)
            signal.alarm(5)
            try:
                uClient = ur(absolute_link) #opens site, and gets page
                pageText = uClient.read() # html
                uClient.close() #closes sites
                linkCount += 1
                pageSoup = bs(pageText, "html.parser") #html parser
                print(linkCount)
                intro = pageSoup.findAll("p") # job description
                middle = pageSoup.findAll("li") # tech
                for i in middle:
                    if(str(i)[3] == ' '):
                        pass
                    else:
                        line = (str(i)[4:-5]).lower()
                        line = re.sub(r"[^a-zA-Z0-9#]+", ' ', line)
                        for t1,t2 in now_next(line.split()):
                            if(t1 in tech and techFound[t1] == False): 
                                tech[t1] = tech[t1] + 1 # adds a tally
                                techFound[t1] = True # prevents duplicates
                            else:
                                try:
                                    twoString = t1+" "+t2 # finds two string
                                    if(twoString in tech):
                                        tech[twoString] = tech[twoString] + 1 
                                        techFound[twoString] = True # prevents duplicates
                                except:
                                    pass
            except:
                signal.alarm(0)
                print("oof")
                continue               
            techFound = {x: False for x in techFound}  
    except:
        pass 
    url = "https://www.indeed.com/jobs?q=software+engineer&start="

print("Amount of links: ", linkCount)
print("Writing to CSV")
aws = 0

with open('engData.csv', 'w+', newline = '') as csv_file:
    writer = csv.writer(csv_file)
    for key, value in tech.items():
        if(key == "aws" or key == "amazon web"):
            aws+=1
        else:
            writer.writerow([key, value])
    writer.writerow(["aws", aws])
    
    
print("Done writing to CSV")
end = time.time()
print("Execution time: ",end - start)
