def setup_game():
    rooms = {
        "Entrance": {"north": "Library", "item": None},
        "Library": {"south": "Entrance", "east": "Lab", "item": "Key"},
        "Lab": {"west": "Library", "north": "Vault", "item": "Note"},
        "Vault": {"south": "Lab", "item": "Treasure"},
    }
    inventory = []
    return rooms, "Entrance", inventory


def show_status(current_room, inventory):
    print("\n---------------------------")
    print(f"You are in the {current_room}")
    print(f"Inventory: {inventory}")
    print("---------------------------")


def get_command():
    command = input("What do you want to do? ").strip().lower()
    return command


def math_puzzle():
    print("\nThe door is locked with a math code!")
    print("Solve this to open it:")
    print("What is 12 + 8 × 2?")
    answer = input("Your answer: ").strip()
    if answer == "28":
        print("Correct! The door unlocks.")
        return True
    else:
        print("Wrong! The door stays locked.")
        return False


def main():
    print("Welcome to the Mini Adventure!")
    print("Collect items and solve the puzzle to find the treasure.\n")

    rooms, current_room, inventory = setup_game()
    game_over = False
    puzzle_solved = False

    while not game_over:
        show_status(current_room, inventory)
        command = get_command()

        if command.startswith("go "):
            direction = command.split(" ")[1]
            if direction in rooms[current_room]:
                next_room = rooms[current_room][direction]
        
                if next_room == "Vault" and not puzzle_solved:
                    if math_puzzle():
                        puzzle_solved = True
                        current_room = next_room
                    else:
                        continue
                else:
                    current_room = next_room
            else:
                print("You can’t go that way!")

        elif command.startswith("get "):
            item_name = command.split(" ", 1)[1]
            if "item" in rooms[current_room] and rooms[current_room]["item"] == item_name:
                inventory.append(item_name)
                rooms[current_room]["item"] = None
                print(f"You picked up the {item_name}.")
            else:
                print("That item isn’t here.")

        elif command in ["look", "search"]:
            item = rooms[current_room].get("item")
            if item:
                print(f"You see a {item} here.")
            else:
                print("There’s nothing special here.")

        elif command == "inventory":
            print(f"You have: {inventory}")

        elif command in ["quit", "exit"]:
            print("You’ve left the adventure. Goodbye!")
            break

        # Win condition
        if current_room == "Vault" and "Treasure" in inventory:
            print("\n🎉 You found the treasure and won the game! 🎉")
            game_over = True


if __name__ == "__main__":
    main()
