print("Functions below")

# how to define a function
# start with def
# indentation and spacing matters
x = 0
def sample_funtion():
     print(f"{x}you ran the function")
     #call the function below
     sample_funtion()

 # pass Values into the function to do math
def do_additon(x, y):
    sum = x + y
    print(sum)

do_additon(3,10) # Whatever numbers you place in here, it will add them together , because of the do_addition() function

# Take input from the user and pass that value through the funtion
num_1 = float(input("please enter a number: "))
num_2 = float(input("please enter another number: "))
do_additon(num_1, num_2)

your_name = input("welcomne traveler, what is your name? ")
your_age = int(input(f"hi {your_name}. What is your age"))
                     

def npc_response() : 


    if your_age < 50:
        print("hi there young traveler. i have a quest for you.")
        your_age >= 50
        print("")
    else:
        print("Something went wrong. Cannot compute. Level 5 error. Rebooting.")
