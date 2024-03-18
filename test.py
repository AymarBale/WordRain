import keyboard
import subprocess
import os
import signal

def stop_sp_to_text():
    print("Stopping SpToText.py...")
    os.kill(os.getpid(), signal.CTRL_BREAK_EVENT)

def run_script():
    print("Starting SpToText.py")
    subprocess.Popen(["python", "SpToText.py"])

def stop_script():
    stop_sp_to_text()
    subprocess.run(["taskkill", "/f", "/im", "python.exe", "/t"])
    

# Registering hotkeys
keyboard.add_hotkey('k', run_script)
keyboard.add_hotkey('l', stop_script)

print("Press 'k' to start the SpToText.py script, and 'l' to stop.")
keyboard.wait('esc')  # Wait until the 'esc' key is pressed to exit the program
