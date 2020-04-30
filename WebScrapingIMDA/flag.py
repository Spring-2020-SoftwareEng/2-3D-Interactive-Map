from bs4 import BeautifulSoup
import requests

pop = open("popFile.txt", "r")
flagFile = open("flagFile.txt", "w")

pList = list(pop)

source = requests.get('https://www.cia.gov/library/publications/the-world-factbook/appendix/appendix-d.html').text
appendix = BeautifulSoup(source, 'lxml')

tbody = appendix.find('tbody')

i = 0

for country in tbody.find_all('tr'):
    abr = country.find_all('td')[2].text
    pa = pList[i].split("\"")[1]
    if pa == abr:
        name = country.find('a')
        newab = name['href'].split('.')[2]
        newab = newab.split("/")[2].upper()
        add = "\"https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/" + newab + "-flag.gif\""
        flagFile.write(add + "\n")
        i += 1

pop.close()
flagFile.close()
