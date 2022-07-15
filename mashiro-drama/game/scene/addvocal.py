# coding: UTF-8
ff = open('vol3.addvocal.txt', 'w')
with open('vol3.origin.txt', 'r', encoding='UTF-8') as f:
    line = f.readlines()
    num = 0
    for line_list in line:
        num = num + 1
        line_new = line_list.replace('\n', '')
        line_new = line_new + r' -vol3/' + str(num) + r'.ogg;' + '\n'
        print(line_new)
        ff.write(line_new)
