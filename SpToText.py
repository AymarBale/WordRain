import speech_recognition as sr
import threading
from queue import Queue

def recognize_and_save_audio(recognizer, audio_queue):
    while True:
        audio_data = audio_queue.get()
        try:
            # Recognize the audio
            text = recognizer.recognize_google(audio_data, language="en-US")

            # Print and save the recognized text
            print("Decoded Text : {}".format(text))
            with open("text.txt", "a") as file:
                file.write(text + "\n")

        except sr.UnknownValueError:
            # No speech detected, continue the loop
            continue

# Adjusting for ambient noise
recognizer = sr.Recognizer()
with sr.Microphone() as source:
    print("Adjusting noise ")
    recognizer.adjust_for_ambient_noise(source, duration=1)
    print("Adjustment done")

# Start a separate thread for recognition
audio_queue = Queue()
recognition_thread = threading.Thread(target=recognize_and_save_audio, args=(recognizer, audio_queue))
recognition_thread.start()

# Main thread continues to capture audio
try:
    print("Listening for real-time speech recognition. Press Ctrl+C to stop.")
    with sr.Microphone() as source:
        while True:
            # Capture audio in the main thread
            audio_data = recognizer.listen(source, timeout=None)
            audio_queue.put(audio_data)

except KeyboardInterrupt:
    print("Real-time speech recognition stopped.")
except Exception as ex:
    print(ex)
