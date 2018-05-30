DROP DATABASE IF EXISTS SipIt_db;

CREATE DATABASE SipIt_db;

USE SipIt_db;

CREATE TABLE foodpairingssss
(
    id int NOT NULL AUTO_INCREMENT,
  --   age INTEGER(8) NOT NULL,
   	zip VARCHAR(9) NOT NULL,
    food  VARCHAR(30) NOT NULL,
   	paired BOOLEAN DEFAULT TRUE,
   	first_match VARCHAR(30) NOT NULL,
   	-- comparable_wines1 VARCHAR(50) NOT NULL,
--    	comparable_wines2 VARCHAR(50) NOT NULL,
--    	comparable_wines3 VARCHAR(50) NOT NULL,
-- 	image_first_match VARCHAR(500) NOT NULL,
--     image_comparable_wines1 VARCHAR(500) NOT NULL,
--     image_comparable_wines2 VARCHAR(500) NOT NULL,
--     image_comparable_wines3 VARCHAR(500) NOT NULL,
   	description VARCHAR(500) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE messages
(
    id int NOT NULL AUTO_INCREMENT,
   email VARCHAR(30) NOT NULL,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   message VARCHAR(8000) NOT NULL,

    PRIMARY KEY (id) 
);

I-- NSERT INTO foodpairingsss (age, zip, food, paired, first_match, comparable_wines1, comparable_wines2, comparable_wines3, image_first_match, image_comparable_wines1, image_comparable_wines2, image_comparable_wines3, description) 
-- VALUES 
-- (22, 80249, 'Chicken', 1, 'Robert Mondovi Pinot Noir', 'Chehalem INOX Chardonnay', 'Downton Abbey Countess of Grantham Chardonnay','Raymond Reserve Selection Chardonnay','NV Mindbender Chardonnay','image1','image2','image3','this is a test wine!'),
-- (27, 80111, 'pasta', 1, 'Elouan Pinot Noir','Chehalem INOX', 'Countess of Grantham Chardonnay','Raymond Reserve Selection Chardonnay','Mindbender Chardonnay','image1','image2','image3','2nd this is a test wine!');

CREATE TABLE users
(`id` int(11) NOT NULL AUTO_INCREMENT, 
`name` varchar(255) NOT NULL, 
`email` varchar(255) NOT NULL, 
`password` varchar(255) NOT NULL, 
`created_at` datetime NOT NULL, 
`updated_at` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1

Select * From foodpairingssss