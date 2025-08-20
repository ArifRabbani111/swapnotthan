CREATE DATABASE IF NOT EXISTS swapnotthan;
USE swapnotthan;

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  image_url VARCHAR(255),
  facebook_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO events (title, date, location, description, image_url) VALUES
('Blood Donation Camp', '2024-06-15', 'SUST Campus, Sylhet', 'Join our annual blood drive to help local hospitals. Donors receive a certificate and refreshments.', 'https://picsum.photos/seed/blood-drive/400/250.jpg'),
('Eid Clothing Drive', '2024-04-05', 'Zindabazar, Sylhet', 'Distribute new clothes to underprivileged children before Eid-ul-Fitr.', 'https://picsum.photos/seed/eid-clothing/400/250.jpg'),
('Winter Relief Program', '2024-12-20', 'Rural Sylhet', 'Provide warm clothes and blankets to families in need during winter.', 'https://picsum.photos/seed/winter-relief/400/250.jpg');

INSERT INTO members (name, position, image_url, facebook_url, linkedin_url) VALUES
('Dhiman Das Dibya', 'President', 'https://picsum.photos/seed/dhiman/150/150.jpg', '#', '#'),
('Maibam Darpan', 'General Secretary', 'https://picsum.photos/seed/maibam/150/150.jpg', '#', '#'),
('Sabrina Ahmed', 'Blood Wing Coordinator', 'https://picsum.photos/seed/sabrina/150/150.jpg', '#', '#'),
('Arif Rahman', 'Education Wing Head', 'https://picsum.photos/seed/arif/150/150.jpg', '#', '#');