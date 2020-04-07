from bs4 import BeautifulSoup
import requests

pop = open("popFile.txt", "r")
popflag = open("flagFile.txt", "w")

for line in pop:
    id = "" + line[7] + line[8]
    add = ", \"flag\": \"https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/" + id + "-flag.gif\""
    slice = line.split(" }")
    popflag.write(slice[0] + add + " },\n")

pop.close()
popflag.close()
