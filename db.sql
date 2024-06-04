-- Tạo cơ sở dữ liệu tên là sensor_data
CREATE DATABASE cjec;

-- Sử dụng cơ sở dữ liệu vừa tạo
USE cjec;

-- Tạo bảng để lưu dữ liệu nhiệt độ và độ ẩm
CREATE TABLE measurements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
