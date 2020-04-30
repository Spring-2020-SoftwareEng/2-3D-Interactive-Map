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
gdp = -1

popFile = open("popFile.txt", "w")
maFile = open("maFile.txt", "w")
gdpFile = open("gdpFile.txt", "w")
nameFile = open("nameFile.txt", "w")
popGrFile = open("popGrFile.txt", "w")
brFile = open("brFile.txt", "w")
drFile = open("drFile.txt", "w")
lfFile = open("lfFile.txt", "w")
pbplFile = open("pbplFile.txt", "w")
capFile = open("capFile.txt", "w")
mrFile = open("mrFile.txt", "w")
bgFile = open("bgFile.txt", "w")

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

        div = cPage.find('div', id='field-background')
        try:
          bg = str(div.text.encode('utf-8'))
        except Exception as e:
          bg = -1

        div = cPage.find('div', id='field-map-references')
        try:
          mr = str(div.text.encode('utf-8')).replace(' ', '')
          mr = mr.replace('\\n','')
        except Exception as e:
          mr = -1

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

        div = cPage.find('div', id='field-population-growth-rate')
        try:
          gr = div.find('span', class_='subfield-number').text.split('%')[0]
        except Exception as e:
          gr = -1

        div = cPage.find('div', id='field-birth-rate')
        try:
          br = div.find('span', class_='subfield-number').text.split(' ')[0]
        except Exception as e:
          br = -1

        div = cPage.find('div', id='field-death-rate')
        try:
          dr = div.find('span', class_='subfield-number').text.split(' ')[0]
        except Exception as e:
          dr = -1

        try:
          div = cPage.find('div', id='field-capital')
          div = div.find('div', class_='category_data subfield text')
        except Exception as e:
          print('][')
        try:
          cap = str(div.text.encode('utf-8')).replace(' ', '')
          cap = cap.replace('name:', '')
          cap = cap.replace('\\n','')
        except Exception as e:
          cap = -1

        div = cPage.find('div', id='field-gdp-purchasing-power-parity')
        try:
          gdp = div.find('span', class_='subfield-number').text
        except Exception as e:
          gdp = -1

        div = cPage.find('div', id='field-labor-force')
        try:
          lf = div.find('span', class_='subfield-number').text
        except Exception as e:
          lf = -1

        div = cPage.find('div', id='field-population-below-poverty-line')
        try:
          pbpl = div.find('span', class_='subfield-number').text.split('%')[0]
        except Exception as e:
          pbpl = -1

    except Exception as e:
        abr = '-'

    if abr != '-' and pop != -1 and age != -1 and gdp != -1:
        countryData.append((name.text, pop, age))

        pop = pop.replace(',', '')

        gdp = gdp.replace('$', '')
        gdp = gdp.split(' ')
        gdp[1] = gdp[1].replace('million', '000000')
        gdp[1] = gdp[1].replace('billion', '000000000')
        gdp[1] = gdp[1].replace('trillion', '000000000000')
        if '.' in gdp[0]:
            temp = gdp[0].split('.')
            gdp[1] = gdp[1][:-len(temp[1])]
            gdp[0] = temp[0] + temp[1]
        gdp = gdp[0] + gdp[1]

        lf = str(lf).split(' ')
        if(len(lf) > 1):
          lf[1] = lf[1].replace('million', '000000')
          lf[1] = lf[1].replace('billion', '000000000')
          lf[1] = lf[1].replace('trillion', '000000000000')
          if '.' in lf[0]:
            temp = lf[0].split('.')
            lf[1] = lf[1][:-len(temp[1])]
            lf[0] = temp[0] + temp[1]
          lf = lf[0] + lf[1]
        else:
          lf = lf[0]
          lf = lf.replace(',', '')

        bg = str(bg).replace('\\n','')
        bg = bg.replace('  ','')

        popFile.write('{ id: "' + abr + '", value: ' + pop + ' }')
        maFile.write('{ id: "' + abr + '", value: ' + age + ' }')
        gdpFile.write('{ id: "' + abr + '", value: ' + gdp + ' }')
        nameFile.write('{ id: "' + abr + '", value: ' + name.text + ' }')
        bgFile.write('id: ' + abr + "&&&" + bg + '\n')
        mrFile.write('id: ' + abr + "&&&" + mr + '\n')
        popGrFile.write('id: ' + abr + "&&&" + gr + '\n')
        brFile.write('id: ' + abr + "&&&" + br + '\n')
        drFile.write('id: ' + abr + "&&&" + dr + '\n')
        capFile.write('id: ' + abr + "&&&" + str(cap) + '\n')
        lfFile.write('id: ' + abr + "&&&" + lf + '\n')
        pbplFile.write('id: ' + abr + "&&&" + str(pbpl) + '\n')

        if itr < 272:
            popFile.write(',\n')
            maFile.write(',\n')
            gdpFile.write(',\n')
            nameFile.write(',\n')
    else:
        otherCountries.append(country.text)
        print('....')

countryData.pop(0)
#otherCountries.pop(0)

popFile.close()
maFile.close()
gdpFile.close()
nameFile.close()
popGrFile.close()
brFile.close()
drFile.close()
lfFile.close()
pbplFile.close()
capFile.close()
mrFile.close()
bgFile.close()
