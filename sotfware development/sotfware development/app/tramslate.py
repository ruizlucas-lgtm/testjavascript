import speech_recognition as sr
from googletrans import Translator

translator = Translator()

languages = {
    "english": "en",
    "spanish": "es",
    "french": "fr",
    "german": "ge",
    "italian": "it",
    "japanese": "ja", 
    "chinese (simple)": "ch", 
    "korean": "ko", 
    "russian": "ru", 
    "portuguese": "pt", 
}

print("Available languages:")
for i, lang in enumerate(languages.keys(), 1):
    print(f"{i}. {lang}")

choice = int(input("Select a language by number: "))
target_language = list(languages.values())[choice - 1]

print(f"Selected language code: {target_language}")