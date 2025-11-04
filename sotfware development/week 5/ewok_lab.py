# Description: Demostrates list operations and loops with roster of Ewoks
#! Part 1 
print("=== Ewok Ops: Lists and Loops ===\n")

ewoks = ["Wicket", "Paploo", "Teebo", "Nippet"]

print("First ewok:", ewoks[0])
print("Last ewok:", ewoks[-1])


print("Middle pair", ewoks[1:3])

print("Roster size:", len(ewoks))

#! Part 2
print("\n-- Updating the roster --")
ewoks.append("Cheif Chirpa")
print("After append:", ewoks)

ewoks.insert(0, "Logray")
print("After insert at front:", ewoks)

ewoks.extend(["Kneesaa", "Latara"])
print("After extend:", ewoks)

ewoks.remove("Paploo")
print("After remove Paploon:", ewoks)

removed = ewoks.pop()
print("Popped off:", removed)
print("After pop:", ewoks)

ewoks.sort()
print("Sorted A-Z:", ewoks)
ewoks.reverse()
print("Reversed Z-A", ewoks)

#! Part 3 
print("\n-- Roll call --")
for ewok in ewoks:
    print("Present:", ewok)

print("\n-- Numbered roll call (enumrate) --")
for i, ewok in enumerate(ewoks, start=1):
    print(f"{i}. {ewok}")

#! Task A 

#! Task B

print("\n-- L-only squad --")
for ewok in ewoks:
    if ewok.startswith("L"):
        print("L-squad member:", ewok)

#! Task C 
print("\n-- Uppercase calll signs --")
call_signs = {}
for ewok in ewoks: 
    call_signs.append(ewok.upper())
print(call_signs)

#! Task D
print("\n -- Longes name --")
longest = ""
for ewok in ewoks:
    if len(ewoks) > len(longest): 
        longest = ewok 
print("Longest:", longest)

#! Part 5 
print("\n=== Supply Drop ===")
items = ["Berries", "Spears", "Bandages", "Glider Parts"]
counts = [30, 12, 8, 6]

if len(items) != len(counts):
    print("Data error: items and counts are different lengths!")
else:
    total = 0 
    for i in range(len(items)): 
        line = f"{items[i]} x {counts[i]}"
        print(line)
        total += counts[i]
    print("Total units:", total)