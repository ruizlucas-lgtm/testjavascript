# Main quest = Creating a Character Sheet
player_character = {
    "name": "LR",
    "class": "mage",
    "guild": "arcus",
    "is_active": True, 
    "inventory":{ "Staff of Coding", "Book of Python", "Mana Potion of Starbucks"},
     "Health":90,
}


print(f"Character name: {player_character['name']}")
print(f"Remaining Health: {player_character['Health']}")
print(f"Current Inventory: {player_character['inventory']}")
print(f"{player_character['name']}'s first inventory item is {player_character['inventory'][0]}")

#modify Dictionary 
player_character['name'] = "LR2"
print(f"Character name: {player_character['name']}")
player_character["level"] = 100
print(f"Character Level: {player_character[ 'level']}")

# Iterate over a dictionary 
print("\n--- Looping through Keys, while showing Values ---")
for stat_key in player_character:
    print(f"Value: {stat_key}")

print("\n--- Looping through kye-value pairs (The Best way?) ---")

#inventory_test = ["Staff of Coding", "Book of Python", ]
