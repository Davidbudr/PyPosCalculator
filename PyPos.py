import math
import subprocess
import platform

posx = float(input("What is the x position of your center point? (Default: 0) ") or "0")
posy = float(input("what is the y position of your center point? (Default: 0) ") or "0")

deg2rad = math.pi / 180
offset = float(input("What is the angle of offset for you shape? (Default: 0) ") or "0")
start = float(input("What is the angle of your starting point? (Default: 0) ") or "0")
end = 360

points = int(input("How many points does your shape have? (Default: 3) ") or "3")

increment = 360/points
distance = float(input("What is the distance from the center point? (Default: 1) ") or "1")

pbool = input("Would you like to export SVG Code? (Y/N) (Default: N) ")
if pbool=="Y" or pbool=="y":
    pbool = True
else:
    pbool = False
close = True
if (pbool) :
    close = input("Does your shape close? (Y/N) (Default: Y) ")
    if close=="Y" or close=="y":
        close = True
    else:
        close = False
        
ang = start

code = "M"

while ang < end:
    x = posx + (distance * math.sin((ang+offset) * deg2rad))
    y = posy + (distance * math.cos((ang+offset) * deg2rad))
    if (pbool) :
        code += str(x) + " " + str(y) + " "
    else:
        print("x: ", x, " y: ", y )
    ang += increment

subprocess.call("clear")

if (pbool):
    if (close):
        code += "Z"
    txt = "<path stroke=\'black\' fill=\'white\' stroke-width=\'2\' d=\'" + code + "\'/>"
    if (platform.system() == "Windows"):
        subprocess.call("echo \"" + txt.strip() + "\" | clip", shell=True)
    elif (platform.system() == "Darwin") or (platform.system() == "Linux"):
        subprocess.call("echo \"" + txt.strip() + "\" | pbcopy", shell=True)
    print("Copied to Clipboard!")
