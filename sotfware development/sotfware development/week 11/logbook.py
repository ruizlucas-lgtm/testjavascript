import os 
from datetime import datetime
import time
import random 


os.makedirs("data", exist_ok=True)
LOG_PATH = os.path.join("data", "adventure.log")

if not os.path.exists(LOG_PATH): 
    with open(LOG_PATH, "w", encoding="utf-8") as f: 
        f.write("# Endor Logbook - created at " + datetime.now() .isoformat() + "\n")

def prove_modes() : 
    print("\n=== Proving Modes ===")
    # 1) w - overwrite or create, cannot read
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        f.write("NEW ERA BEGINS\n")
    print("w: wrote NEW ERA BEGINS (previous content overwritten)")

    #2) a - append (cannot read)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write("APPENDED: Party assembled at the gate\n")
    print("a: append a new line")

    # 3) r - Read (file must exist)
    with open(LOG_PATH, "r", encoding="utf-8") as f: 
        print("r: first 40 chars ->", (f.read(40)).replace("\n", "\\n"))

    # 4) w+ - write + read (must seek before reading)
    with open(LOG_PATH, "w+", encoding="utf-8") as f: 
        f.write("W+ ERA: reset + can read\n")
        f.seek(0)
        print("w+:", f.read() .strip())
    
    # 5) a+ - append +read (pointer at end; seek to road)
    with open(LOG_PATH, "a+", encoding="utf-8") as f: 
        f.write("A+ append line \n")
        f.seek(0)
        print("a+: file now has ->", f.readline().strip(), " ...")

    # 6) r+ - read + write (file must exist)
    with open(LOG_PATH, "r+", encoding="utf-8") as f:
        head = f.readline()
        f.write("R+ wrote at current position\n")
        f.seek(0)
        print("r+: head:", head.strip())

class Logbook:
    def __init__(self, path: str):
        self.path = path
        os.makedirs(os.path.dirname(path), exist_ok=True)
        if not os.path.exists(path):
             with open(path, "w", encoding="utf-8") as f:
                f.write("# Endor Logbook — created " + datetime.now().isoformat() + "\n")
def write_entry(self, text: str):
    """Append a timestamped line (safe for logs)."""
    with open(self.path, "a", encoding="utf-8") as f:
     stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    f.write(f"[{stamp}] {text}\n")
def read_all(self) -> list[str]:
    """Return all lines (stripped) or empty list if missing."""
    try:
        with open(self.path, "r", encoding="utf-8") as f:
            return [line.rstrip("\n") for line in f]
    except FileNotFoundError:
        return []
def search(self, keyword: str) -> list[str]:
    """Case-insensitive search across lines."""
    lines = self.read_all()
    k = keyword.lower()
    return [ln for ln in lines if k in ln.lower()]

ENCOUNTERS = [
"goblin ambush near the river",
"mysterious traveler offers a quest",
"ancient door sealed by runes",
"storm delays travel",
"merchant caravan arrives",
"howling from the old ruins",
]
def random_encounter() -> str:
# small pause for drama
    time.sleep(0.3)
    return "Encounter: " + random.choice(ENCOUNTERS)



