# Ewok Data tracker - Created by Lucas 

ewok_data = {
    "name": "J.J",
    "age": "19",
    "weapon": "sword",
    "rank": "Suborednet"
}

print("Ewok Name:", ewok_data["name"])
print("Ewok Age:", ewok_data["age"])
print("Ewok Weapon:", ewok_data["weapon"])
print("Ewock Rank:", ewok_data["rank"])

ewok_data["weapon"] = "Shield" # Update the weapon
ewok_data["rank"] = "Commander" # Update the rank 
ewok_data["homeworld"] = "Endor" # Adding homeworld

print("\nUpdated Ewok Data")
for key, value in ewok_data.items():
    print(f"{key}: {value}")

ewok_tribe = {
    "Wicket": ewok_data, 
    "Chief Chirpa": {
        "name": "Chief Chirpa", 
        "age": 30, 
        "weapon": "acient sword", 
        "rank": "Master Chief",
        "homeworld": "endor"
    }
}

print("\nEwok Tribe Data:")
for ewok_name, ewok_info in ewok_tribe.items():
    print(f"\nEwok: {ewok_name}")
    for key, value in ewok_info.items():
        print(f"{key}: {value}")