# divide the amount of pennies to out put rhe amount of Dollars, Quarters, Dimes, Nickles and Pennies

num_of_pennies = int(input("How many pennies do you have? ")) 

num_dollar = 100
num_quarter = 25
num_dime = 10
num_pennies = 1

def pennies_divided():
    dollar = num_of_pennies / num_dollar  
    print(int(dollar))
    
    quarter = num_of_pennies / num_quarter
    print(int(quarter))

    dime = num_of_pennies / num_dime
    print(int(dime))
    
    penny = num_of_pennies / num_pennies
    print(int(penny))

pennies_divided()


