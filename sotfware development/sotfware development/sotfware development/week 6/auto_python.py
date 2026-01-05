import pyautogui as pg
import time

def pointer_location():
    try:
        while True:
            x, y = pg.position()          # Get current mouse position
            print(f"(x, y) = ({x:4d}, {y:4d})", end="\r")
            time.sleep(0.05)              # Update ~20 times per second
    except pg.FailSafeException:
        print("\nProgram stopped (mouse in top-left corner).")
pointer_location()

pg.FAILSAFE = True
print("Move the mouse to the top-left corner to stop the program.")

# def send_email():
#     EMAIL_URL = "https://www.gmail.com"
#     EMAIL_TO = "micheal.sekol@mahoningctc.com"

#     SUBJECT = "Author/Gui Email from lucas"
#     BODY = "This is an automated email from my code"
#     pg.moveTo(900, 52)
#     pg.click()
#     pg.write(EMAIL_URL)
#     pg.press('enter')
#     pg.sleep(4)
#     pg.moveTo(171, 217)
#     pg.click()
#     pg.moveTo(1304, 481)
#     pg.click()
#     pg.sleep(0.75)
#     pg.write(EMAIL_TO)
#     pg.moveTo(1280, 513)    
#     pg.click()
#     pg.write(SUBJECT)
#     pg.sleep(0.75)
#     pg.moveTo(1271, 562)
#     pg.click()
#     pg.write(BODY)
#     pg.sleep(0.75)
#     pg.moveTo(1301, 991)
#     pg.click()
    
# send_email()
    