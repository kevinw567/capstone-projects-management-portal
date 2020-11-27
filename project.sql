CREATE DATABASE project_db;
USE project_db;

#Table to store student information
CREATE TABLE users(
id INT NOT NULL PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
extra_details VARCHAR(100),
email VARCHAR(100) NOT NULL,
authentication VARCHAR(100) NOT NULL 
);

CREATE TABLE roles(
role varchar(20) NOT NULL PRIMARY KEY,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE projects(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
project_name VARCHAR(200) NOT NULL,
project_detail VARCHAR(250),
client_name VARCHAR(50) NOT NULL,
client_contact VARCHAR(100),
extra_details VARCHAR(255),
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id)
);