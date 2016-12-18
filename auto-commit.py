from os import system as execute

print("Auto git commit will start...")

execute("git add .")
execute("git commit -m 'testing the auto-commit commad'")
# print(execute)
