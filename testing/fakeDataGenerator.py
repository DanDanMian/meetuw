# This is a script that generate 10000 fake accounts for testing purposes

# An example is as follows:
# {
  #   "name": "Da Wei",
  #   "initials": "DW",
  #   "avatar": "picture_of_cute_cat.jpg",
  #   "program": "Computer Science",
  #   "email": "d4wei@edu.uwaterloo.ca,
  #   "course": [{
    #   "term": 1189,
    #   "subject": "CS",
    #   "catalog_number": "493"
    # }]
  # }

import random
import string

TOTAL_ACC = 10;

# ********* Helper Function *********
def generate_fake_names(firstNames, lastNames, nameList):
    for i in range(0, TOTAL_ACC):
        first_name = random.choice(firstNames)
        second_name = random.choice(lastNames)
        full_name = ''.join(first_name+" "+second_name)
        nameList.append(full_name)
    return nameList


def generate_fake_initials(lastNames, initialList):
    for i in range(0, TOTAL_ACC):
        initial = random.choice(lastNames)
        initialList.append(initial)
    return initialList

def generate_fake_avatar(avatarList):
    for i in range(0, TOTAL_ACC):
        avatarList.append("picture_of_cute_cat.jpg")
    return avatarList

# def generate_fake_program(programs, programList):


def generate_fake_email(emailList):
    for i in range(0, TOTAL_ACC):
        first_char = random.choice(string.ascii_letters)
        two_digits = random(3)
        last_two_chars = random.choice(string.ascii_letters) + random.choice(string.ascii_letters) + random.choice(string.ascii_letters)
        email = first_char + str(two_digits) + last_two_chars + "@edu.uwaterloo.ca"
        emailList.append(email)
    return emailList


# ********* Testing Data Declaration *********
# Generating random fullname for users
firstNames = ["Da", "Tina", "Lingyi", "Fred", "Angela", "John", "Jack", "Owen", "Anna", "Leslie"]
lastNames = ["A", "Aa", "Bc", "Ws", "Li", "Tim", "Xu", "Zheng", "Li", "Ji", "Jim", "Tom"]
nameList = generate_fake_names(firstNames, lastNames, [])
print nameList


# Generating random initials for users
initialList = generate_fake_initials(lastNames, [])
print initialList

# Generating randome avatars for users
avatarList = generate_fake_avatar([])
print avatarList

# Generating random program for users
programList = generate_fake_program([])
print programList

# Generating random 
emailList = generate_fake_email([])
print emailList

# # Academic
# courseList = []  # Array of array of tuples where contains term, subject, catalog_number


# ********* Fake Data Generation *********


# ********* Parse to JSON ********* 

