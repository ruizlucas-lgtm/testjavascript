import pyautogui as pg
import time
pg.FAILSAFE = True
print("Move the mouse to the top-left corner to stop the program.")
def pointer_location():
    x, y = pg.position()
    print(f"(x, y) = ({x:4d}, {y:4d})", end="\r")
try:
    while True:
        pointer_location()
        pg.moveTo(603, 323)
        pg.click()
        pg.scroll(-500)
        pg.moveTo(669, 780)
        pg.click()
        pg.moveTo(677, 893)
        pg.click()
        pg.sleep(0.4)
        pg.moveTo(742, 280)
        pg.click()
        time.sleep(0.79)
except KeyboardInterrupt:
    print("\nProgram stopped by user.")