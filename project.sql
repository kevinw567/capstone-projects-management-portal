CREATE DATABASE project_db;
USE project_db;

CREATE TABLE roles(
id INT NOT NULL PRIMARY KEY,
role varchar(20) NOT NULL
);

#Table to store student information
CREATE TABLE users(
id INT NOT NULL PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role_id INT NOT NULL,
extra_details VARCHAR(100),
email VARCHAR(100) NOT NULL,
passkey VARCHAR(100) NOT NULL,
FOREIGN KEY (role_id) REFERENCES roles(id),
UNIQUE KEY (email,passkey)
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