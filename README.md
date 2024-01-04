## tool băm password
- CÓ khả năng tạo 128^128 kết quả, ước chừng vài trăm nghìn tỉ tỉ tỉ kết quả
  - Đã bao gồm chống trùng lặp kết quả
  - Chống rơi vào vô hạn kết quả
  - thay line code 14  : hash_length = number ( đây là độ dài ký tự có trong password, ví dụ 6 ký tự, 8 ký tự )
  - thay line code 19 string_per_second = number ( đây là tốc độ tạo kết quả trong 1 giây, ví dụ 1 triệu password )
  - lệnh chạy ** python3 main.py **
  - ** pip3 install tqdm **
