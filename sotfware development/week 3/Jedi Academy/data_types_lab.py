my_int = 42 # The answer to life, the universe, and everything

my_float = 3.14 # Pi, as known by wise Jedi mathematicians

print("Thw value of my_int is:", my_int)
print("The value of my_float is:", my_float)

addition = my_int + my_float
subtraction = my_int - my_float
multiplication = my_int * my_float
division = my_int / my_float
power = my_int ** 2 # Squaring the integer
modulus = my_int % 5 # Reminder when my_int is divied by 5 
floor_division = my_int // 7 # Floor division


print("Addition result:", addition)
print("Subtraction result:", subtraction)
print("Mulitplication result:", multiplication)
print("Division result:", division)
print("Power result (my_int squared):", power)
print("Modulus result (my_int % 5):", modulus)
print("Floor division result (my_int // 7):", floor_division)

first_name = "john"
last_name = "john"

Full_name = first_name + " " + last_name
print("Your jedi name is:", Full_name)


name_length = len(Full_name) 
print("The length of your Jedi name is:", name_length, "characters")


message = "May the Force be with you, " + Full_name + "!"
print(message)


starships = ["Millennium Falcon", "X-Wing", "TIE Fighter"]
print("Initial starship fleet:", starships)


starships.append("Star Destroyer")
print("Update starship fleet:", starships)

print("The second starship in formatipn is:", starships[1])

print("The first starship in the fleet is:", starships[0])
print("The last starship in formation:", starships[-1])