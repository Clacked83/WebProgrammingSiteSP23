#THE BELOW CODE IS FOR REGISTERING A USER

import sqlite3
import getpass
import hashlib

# create a connection to the database
conn = sqlite3.connect('profile.db')

# create a cursor object
cursor = conn.cursor()

cursor.execute('''
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
);
''')

# commit the changes to the database
conn.commit()

print("Registering a user")
username = input("Enter username: ")

while True:
  password = getpass.getpass("Enter your password: ")
  confirm_password = getpass.getpass("Confirm your password:")
  if password == confirm_password:
    print("Password set successfully.")
    break
  else:
    print("Passwords do not match. Please try again.")

print("plain password", password)
pass_hash = hashlib.sha256(password.encode()).hexdigest()
print("hash password", pass_hash)

email = input("Enter Your Email for Password recovery: ")

# insert the values into the table using parameterized query
cursor.execute("INSERT INTO user (username, password, email) VALUES (?, ?, ?)", (username, pass_hash, email))

# commit the changes to the database
conn.commit()

cursor.close()
conn.close()


#THE BELOW CODE IS FOR LOGGING IN

import sqlite3
import getpass
import hashlib

# Create a connection to the database
conn = sqlite3.connect('profile.db')

# Create a cursor object to execute SQL commands
c = conn.cursor()

print("Login to the system")
username = input("Enter username: ")
password = getpass.getpass("Enter your password: ")
pass_hash = hashlib.sha256(password.encode()).hexdigest()

# Check if the username and password match
c.execute("SELECT * FROM user WHERE username = ? AND password = ?", (username, pass_hash))
result = c.fetchone()

if result:
    print("Login successful!")
else:
    print("Invalid username or password.")
