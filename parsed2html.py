f = open("parsed.txt", "r")
firstLine = True
lineNumber = 0
while line:=f.readline():
    if line[:2] != '//' and line!='\n' and line!=' \n' and line!='  \n':

        # Lazy parsing to get 'token' & 'kind'
        splitter = line.split('"')
        if len(splitter) == 3:
            _, token, kind = splitter
        kind = kind.strip(':')
        kind = kind.strip(' ')
        kind = kind.strip('\n')

        # Convert whitespace to html
        if token=='\\t':
            token = '&nbsp;'*4
        if token=='\\n':
            token = '<br>'
        if token==' ':
            token = '&nbsp;'

        # This just helps with the weird formatting I chose
        if not firstLine:
            print('>', end='')

        # If first line, print line number
        if firstLine:
            print(f'<span class="line-number">&nbsp;[0]</span')
            print('><span class="normal">&nbsp;</span')
            lineNumber+=1

        # Print our span token
        print(f'<span class="{kind}">{token}</span')

        # If new line, print line number
        if token=='<br>':
            num = f'[{lineNumber}]'
            num = '&nbsp;'*(4-len(num))+num
            print(f'><span class="line-number">{num}</span')
            print('><span class="normal">&nbsp;</span')
            lineNumber += 1

        firstLine = False
print('>')

f.close() 