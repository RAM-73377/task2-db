CREATE DATABASE IF NOT EXISTS user_accounts;
USE user_accounts;

DROP TABLE IF EXISTS colleges;
DROP TABLE IF EXISTS family_background;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) UNIQUE NOT NULL,
    domain VARCHAR(255) NOT NULL
);

CREATE TABLE colleges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    collegeName VARCHAR(255) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    fieldOfStudy VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE family_background (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    fatherName VARCHAR(255) NOT NULL,
    motherName VARCHAR(255) NOT NULL,
    numberOfSiblings INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
SELECT LAST_INSERT_ID();

SHOW TABLES;

DESCRIBE users;
DESCRIBE colleges;
DESCRIBE family_background;

SELECT * from users;
SELECT * from colleges;
SELECT * from family_background;

SELECT 
    u.id AS userId,
    u.firstName,
    u.lastName,
    u.email,
    u.contactNumber,
    u.domain,
    c.collegeName,
    c.degree,
    c.fieldOfStudy,
    c.startDate,
    c.endDate,
    f.fatherName,
    f.motherName,
    f.numberOfSiblings
FROM 
    users u
LEFT JOIN 
    colleges c ON u.id = c.userId
LEFT JOIN 
    family_background f ON u.id = f.userId
WHERE 
    u.id = 5; 
