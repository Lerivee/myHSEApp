![WhatsApp Image 2025-03-22 at 14 28 16_288e68d7](https://github.com/user-attachments/assets/226d0ad1-f981-43ad-bfa9-30bb197c42d7)# MyHSEApp

**MyHSEApp** is a mobile-first application designed to help students and administrators manage Health, Safety, and Environmental (HSE) concerns in academic environments. It enables users to report issues, receive updates, and view safety notifications all in one place.

---

## 🚀 Features

### 🎓 Student Interface
- Register and log in securely
- Submit health, safety, or environment-related reports
- Upload images, videos, files, and location data with reports
- View and receive real-time HSE notifications

### 🧑‍💼 Admin Interface (Web)
- Review and manage submitted reports
- Send custom notifications to students
- View user profiles and activity logs
- Dashboard for basic analytics

---

## 🛠️ Tech Stack

- **Frontend (Mobile)**: React Native with Expo
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer / Cloudinary (optional)
- **UI/Icons**: React Native Paper / React Native Vector Icons
- **Development Tool**: Expo Go

---

## 📦 Installation
### 1. Clone the repository
git clone https://github.com/Lerivee/myHSEApp.git
cd myHSEApp

### 2. Install dependencies
## For the mobile frontend:
cd mobile
npm install
npm start

## For the backend:
cd backend
npm install
npm run dev

### 3. Create environment variables
In the /backend folder, create a .env file with the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Replace with your actual MongoDB URI and secret key.

### 📂 Project Structure
Most Important 
myHSEApp/
│
├── backend/           # Node.js + Express backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
│
├── mobile/            # React Native app for students
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   └── assets/
│
└── README.md

### ✅ Future Improvements
Push notification support
In-app chat system between students and admin
Exportable report history
Role-based admin control (HSE officers, department heads, etc.)
Enhanced analytics and charts

### 🤝 Contributing
Contributions are welcome!
To contribute:
Fork the repo
Create a feature branch
Commit your changes
Push and open a pull request

### 📄 License
This project is licensed under the MIT License.

### 👩‍💻 Developer
Valerie Onoja Amarachi
📧 Email: jovalyn.valerie@gmail.com
🇳🇬 Nigeria

### 📷 Screenshots
![WhatsApp Image 2025-03-22 at 14 28 39_f6001fcf](https://github.com/user-attachments/assets/e1599257-3adb-4268-903b-7069bd64e809)
![WhatsApp Image 2025-03-22 at 14 28 36_7c2a0641](https://github.com/user-attachments/assets/edb22738-f023-4ad4-986d-9cec6c5a4559)
![WhatsApp Image 2025-03-22 at 14 28 35_71f2b471](https://github.com/user-attachments/assets/85490167-06f5-4ef4-af69-6fd6bc1ecc2c)
![WhatsApp Image 2025-03-22 at 14 28 21_46226818](https://github.com/user-attachments/assets/b41fc7a5-ab6b-4aac-a049-ab169f0e920f)
![WhatsApp Image 2025-03-22 at 14 28 20_1a7fbe49](https://github.com/user-attachments/assets/4b7b5879-f06f-4644-ad8d-02244e21deb5)
![WhatsApp Image 2025-03-22 at 14 28 19_5058353d](https://github.com/user-attachments/assets/3049910f-c89a-4249-9c78-cac7dae0db62)
[Uploading WhatsApp Image 2025-03-22 at 14.28.16_288e68d7.jpg…]()


### 📌 Disclaimer
This project was built for educational and safety support purposes. It is still under active development.








