CREATE DATABASE project_db;
USE project_db;

CREATE TABLE roles(
id INT PRIMARY KEY DEFAULT 2,
rolename varchar(20) NOT NULL
);

#Table to store student information (Password is keyword so i am using passkey)
CREATE TABLE users(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(100) NOT NULL,
-- extra_details VARCHAR(100),
email VARCHAR(100) NOT NULL,
authentication VARCHAR(100) NOT NULL,
role varchar(20) not NULL 
);

-- CREATE TABLE roles(
-- role varchar(20) NOT NULL,
-- user_id INT,
-- FOREIGN KEY (user_id) REFERENCES users(id)
-- );


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

-- table for the course that professor created
CREATE TABLE courses(
    id VARCHAR(20) PRIMARY KEY,
    course_number VARCHAR(20),
    course_description VARCHAR(100),
    professor VARCHAR(100)
);
-- table to store the projects, students in that course
CREATE TABLE courses_info(
    id VARCHAR(20),
    student_id INT,
    projects_id INT,
    FOREIGN KEY (id) REFERENCES courses(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (projects_id) REFERENCES projects(id)
)
