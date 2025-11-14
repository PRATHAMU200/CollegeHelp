# CollegeHelp 🎓 

![GitHub License](https://img.shields.io/github/license/PRATHAMU200/CollegeHelp?style=flat-square)
![GitHub Stars](https://img.shields.io/github/stars/PRATHAMU200/CollegeHelp?style=social)

A student-focused app designed to simplify college life with a **To-Do List**, **Timetable with Class Notifications**, **Local File Drive for Study Materials**, and a **Group Chat System** for quick queries. Stay organized, connected, and productive!

---

## Table of Contents 📑
- [Features](#features-)
- [Installation](#installation-)
- [Usage](#usage-)
- [Contributing](#contributing-)
- [License](#license-)

---

## Features ✨
- **To-Do List**: Manage your tasks and deadlines efficiently.
- **Timetable with Notifications**: Never miss a class with real-time notifications.
- **Local File Drive**: Upload and access study materials quickly.
- **Group Chat System**: Collaborate with peers for fast queries and discussions.

---

## Installation 🛠️
### Prerequisites
- Git
- Node.js (v18+)
- npm/yarn
- Firebase API Key (for authentication and database)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/PRATHAMU200/CollegeHelp.git
   ```
2. Install dependencies:
   ```bash
   cd CollegeHelp && npm install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase credentials in `src/firebaseConfig.js`:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```
4. Start the server:
   ```bash
   npm start
   ```
   
---

## Usage 🚀
### Key Features in Action
- **To-Do List**: Add, edit, and mark tasks as completed.
- **Timetable**: View your schedule and get notified before classes.
- **File Drive**: Upload and download study materials locally.
- **Group Chat**: Join group chats for quick discussions and queries.

### Screenshots
<img src="https://github.com/PRATHAMU200/CollegeHelp/blob/main/Demo/2.jpeg" width="200"> <img src="https://github.com/PRATHAMU200/CollegeHelp/blob/main/Demo/3.jpeg" width="200"> <img src="https://github.com/PRATHAMU200/CollegeHelp/blob/main/Demo/4.jpeg" width="200"><img src="https://github.com/PRATHAMU200/CollegeHelp/blob/main/Demo/5.jpeg" width="200">

### Demo
[Watch Demo Video](https://github.com/PRATHAMU200/CollegeHelp/blob/main/Demo/demo.mp4)




---

## Contributing 🤝
This project is open to contributions from everyone! Here’s how you can contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add: [your feature description]"
   ```
4. Push to your branch and open a Pull Request.


---

## License 📄
This project is licensed under the MIT License.

---
