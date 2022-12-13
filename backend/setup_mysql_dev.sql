-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS coballo_dev_db;
CREATE USER IF NOT EXISTS 'coballo_dev'@'localhost' IDENTIFIED BY 'coballo_dev_pwd';
GRANT ALL PRIVILEGES ON `coballo_dev_db`.* TO 'coballo_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'coballo_dev'@'localhost';
FLUSH PRIVILEGES;
