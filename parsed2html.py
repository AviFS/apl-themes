f = open("parsed.txt", "r")
firstLine = True
while line:=f.readline():
    if line[:2] != '//' and line!='\n' and line!=' \n' and line!='  \n':
        # print(line, end='')
        splitter = line.split('"')
        if len(splitter) == 3:
            _, token, kind = splitter
        kind = kind.strip(':')
        kind = kind.strip(' ')
        kind = kind.strip('\n')
        if token=='\\t':
            token = '&nbsp;'*4
        if token=='\\n':
            token = '<br>'
        kind = kind.replace(" ", "-")
        if not firstLine:
            print('>', end='')
        print(f'<span class="{kind}">{token}</span')
        firstLine = False
print('>')

f.close() 