// Import các module cần thiết
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import cors

// Khởi tạo ứng dụng express
const app = express();

app.use(cors());

// Sử dụng body-parser middleware để parse dữ liệu JSON
app.use(bodyParser.json());

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
    host: 'localhost',
    port: 3336,
    user: 'root',
    password: '',
    database: 'cjec'
});

// Kết nối MySQL
db.connect(err => {
    if (err) {
        console.error('Không thể kết nối tới MySQL:', err);
        process.exit(1);
    }
    console.log('Đã kết nối tới MySQL');
});

// Thiết lập một endpoint để nhận dữ liệu từ ESP32
app.post('/data', (req, res) => {
    // Lấy dữ liệu từ request body
    const { huuco, taiche, nilong, chuphanloai } = req.body;

    // Kiểm tra dữ liệu
    if (huuco == null || taiche == null || nilong == null || chuphanloai == null) {
        return res.status(400).send('Dữ liệu không hợp lệ');
    }

    // Chèn dữ liệu vào bảng MySQL
    const query = 'INSERT INTO rac (huuco, taiche, nilong, chuphanloai) VALUES (?, ?, ?, ?)';
    db.query(query, [huuco, taiche, nilong, chuphanloai], (err, result) => {
        if (err) {
            console.error('Lỗi khi chèn dữ liệu vào MySQL:', err);
            return res.status(500).send('Lỗi server');
        }
        res.status(200).send('Dữ liệu đã được nhận và lưu trữ');
    });
});

// Thiết lập một endpoint để lấy dữ liệu từ MySQL
app.get('/data', (req, res) => {
    // Lấy giá trị limit từ query string, mặc định là 10
    const limit = parseInt(req.query.limit) || 10;

    // Truy vấn dữ liệu từ MySQL, sắp xếp theo timestamp giảm dần và giới hạn số bản ghi
    const query = 'SELECT * FROM rac ORDER BY id DESC LIMIT 1';
    db.query(query, [limit], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy dữ liệu từ MySQL:', err);
            return res.status(500).send('Lỗi server');
        }
        res.status(200).json(results);
    });
});


// Khởi động server tại cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại cổng ${PORT}`);
});