# run once 
with open("log.txt", "w") as f:
    f.write("The 'write' code has been executed.\n")

with open("log.txt", "a") as f:
    f.write("This is the second line and has been appended.\n")

with open("log.txt", "r") as f:
    content = f.read()
    print(content)