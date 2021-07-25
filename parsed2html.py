f = open("parsed.txt", "r")
while line:=f.readline():
    if line[:2] != '//':
        # print(line, end='')
        splitter = line.split('"')
        if len(splitter) == 3:
            _, token, kind = splitter
        kind = kind.strip(':')
        kind = kind.strip(' ')
        kind = kind.strip('\n')
        print(f'<span class="{kind}">{token}</span>')
print()

f.close() 