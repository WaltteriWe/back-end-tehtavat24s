CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'pw';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'mediauser'@'localhost';
FLUSH PRIVILEGES;