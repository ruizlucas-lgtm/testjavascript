class product: 
    def __init__(self, name): 
        self.__name = name  # private attribute

    def get_name(self):  # Getter
        return self.__name
    
class Laptop(product):
    def __init__(self, name, brand):
        super().__init__(name)
        self.brand = brand

    def display_info(self):
        print(f"Laptop Name: {self.get_name()}, Brand: {self.brand}")

with open('sales.txt', 'r') as f:
    for line in f: 
        clean_line = line.strip() #Removes invisible \n 

