from bs4 import BeautifulSoup
import requests

source = requests.get('https://www.cia.gov/library/publications/the-world-factbook/appendix/appendix-d.html').text

appendix = BeautifulSoup(source, 'lxml')

countryData = [[[]]]
itr = 0
otherCountries = []
name = '-'
pop = -1
age = -1

popFile = open("popFile.txt", "w")
maFile = open("maFile.txt", "w")

tbody = appendix.find('tbody')

for country in tbody.find_all('tr'):
    abr = country.find_all('td')[2].text
    name = country.find('a')

    try:
        cLink = 'https://www.cia.gov/library/publications/the-world-factbook' + name['href'].split('.')[2] + '.html'
        cSource = requests.get(cLink).text
        cPage = BeautifulSoup(cSource, 'lxml')

        print(itr)
        itr+=1

        div = cPage.find('div', id='field-population')
        try:
            pop = div.find('span', class_='subfield-number').text
        except Exception as e:
            pop = -1

        div = cPage.find('div', id='field-median-age')
        try:
            age = div.find('span', class_='subfield-number').text.split(' ')[0]
        except Exception as e:
            age = -1
    except Exception as e:
        abr = '-'

    if abr != '-' and pop != -1 and age != -1:
        countryData.append((name.text, pop, age))
        pop = pop.replace(',', '')
        popFile.write('{ id: "' + abr + '", value: ' + pop + ' },\n')
        maFile.write('{ id: "' + abr + '", value: ' + age + ' },\n')
    else:
        otherCountries.append(country.text)


countryData.pop(0)
otherCountries.pop(0)

popFile.close()
maFile.close()
