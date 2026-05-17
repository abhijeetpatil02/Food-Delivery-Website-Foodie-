# 🍔 Foodie — Food Delivery Website

A responsive food delivery website built with **Node.js**, **Express**, and **MySQL**, enabling users to explore food menus, view item details, and simulate an online ordering experience with a clean, user-friendly interface.


## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the App](#running-the-app)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## 📖 About the Project

**Foodie** is a full-stack food delivery web application that allows users to browse food menus, view detailed item information, and place simulated orders. The project focuses on delivering a smooth and visually appealing ordering experience.


## ✨ Features

- 🏠 Home page with featured food items and categories
- 🍕 Browse and explore food menus
- 📋 View detailed information for each food item
- 🛒 Add items to cart and simulate order placement
- 📱 Fully responsive design for mobile and desktop
- 🗄️ MySQL database integration for dynamic data


## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML, CSS, JavaScript   |
| Backend    | Node.js, Express.js     |
| Database   | MySQL (via mysql2)      |
| Templating | EJS / HTML Views        |
| Dev Tools  | Nodemon                 |


## 📁 Project Structure

```
Food-Delivery-Website-Foodie-/
├── public/          # Static assets (images, CSS, JS)
├── static/          # Additional static files
├── views/           # HTML/EJS template files
├── index.js         # Main entry point (Express server)
├── package.json     # Project dependencies
└── README.md


## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL](https://www.mysql.com/) (v8 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhijeetpatil02/Food-Delivery-Website-Foodie-.git
   cd Food-Delivery-Website-Foodie-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Database Setup

1. Open your MySQL client and create a new database:
   ```sql
   CREATE DATABASE foodie_db;
   ```

2. Import the database schema (if a `.sql` file is provided):
   ```bash
   mysql -u root -p foodie_db < database.sql
   ```

3. Update the database connection settings in `index.js`:
   ```js
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'your_mysql_username',
     password: 'your_mysql_password',
     database: 'foodie_db'
   });
   ```

### Running the App

**Development mode (with auto-restart):**
```bash
npx nodemon index.js
```

**Production mode:**
```bash
node index.js
```

Then open your browser and go to:
```
http://localhost:3000



## 📬 Contact

**Abhijeet Patil**
- GitHub: [@abhijeetpatil02](https://github.com/abhijeetpatil02)

