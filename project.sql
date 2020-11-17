CREATE DATABASE project_db;
USE project_db;

#Table to store student information
CREATE TABLE students(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
user_id VARCHAR(50) NOT NULL,
extra_details VARCHAR(100)
);

#Table to store professor information
CREATE TABLE professors(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
sur_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
student_id INT,
FOREIGN KEY (student_id) REFERENCES students(id)
);

#Table to store classes
CREATE TABLE classes(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
class_name VARCHAR(50) NOT NULL,
class_detail VARCHAR(200),
student_id INT,
FOREIGN KEY (student_id) REFERENCES students(id)
);


#Table to store project and client information
CREATE TABLE projects(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
project_name VARCHAR(200) NOT NULL,
project_detail VARCHAR(250),
client_name VARCHAR(50) NOT NULL,
client_contact VARCHAR(100),
extra_details VARCHAR(255),
classes_id INT,
professor_id INT,
FOREIGN KEY (classes_id) REFERENCES classes(id),
FOREIGN KEY (professor_id) REFERENCES professors(id)
);



DESC students;

SELECT * FROM students;
DROP TABLE students;
SHOW tables;
