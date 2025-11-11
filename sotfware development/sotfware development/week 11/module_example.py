#import the module
import random 

# Get random integer between 1 and 20 (Like rolling a d20 dice)

roll = random.randint(1, 20)
print(f"you rolled a {roll}.")

# Pick up random iem from a list
loot_droops =["Sword of a Thousands Truths", "Shield of Doom", "Health potion #9", "Bitcoin of Plunder", "Shoes of Swiftiness", "Banana of Nutrition", "Mana Potion of the Witches Eye"]
my_loot = random.choice(loot_droops)
print(f"You found {my_loot}. Success!")

players = {"Thunderouse Monk", "NinjaFiveo", "Hitogoroshi", "Mad Cow", "Bob"}
random.shuffle(players)
print(f"The turn order is: {players}")