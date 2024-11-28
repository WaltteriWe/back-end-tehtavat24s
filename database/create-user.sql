CREATE USER 'kenny'@'localhost' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'kenny'@'localhost';
FLUSH PRIVILEGES;