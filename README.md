# ELYSIA — E-Commerce Platform

A modern, responsive full-stack e-commerce platform designed for a smooth and engaging online shopping experience.

ELYSIA combines a clean React interface with a dedicated backend to handle products, user interactions, cart functionality, and dynamic application data.

## Overview

ELYSIA is built as a practical full-stack e-commerce project with a focus on:

- Clean and responsive UI
- Dynamic product browsing
- Category-based shopping
- Cart management
- Backend API integration
- Database-driven application flow
- Responsive experience across devices
- Production deployment

The project is structured with separate frontend and backend applications to keep the codebase organized and maintainable.

## Live Demo

Live Application:  
https://elysia-ecommerce-five.vercel.app/

GitHub Repository:  
https://github.com/raniunsa24-coder/ELYSIA-Ecommerce

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Authentication & Security
- bcryptjs
- JSON Web Tokens (JWT)

### Deployment
- Vercel

## 📌 Features

### Shopping Experience
- Browse available products
- Product categories
- Price-based sorting
- Responsive product layout
- Dynamic product data
- Add products to cart
- Cart management

### User Experience
- Responsive navigation
- Dedicated Home, Shop, Search, Account and Cart sections
- Clean modern interface
- Interactive icons
- Mobile-friendly layout

### Backend
- REST API architecture
- MongoDB database integration
- Mongoose models
- Authentication support
- Environment-based configuration
- CORS configuration

## Project Structure

text
ELYSIA-Ecommerce/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md

## Getting Started

### 1. Clone the repository

bash
git clone https://github.com/raniunsa24-coder/ELYSIA-Ecommerce.git
cd ELYSIA-Ecommerce


### 2. Install frontend dependencies

bash
cd frontend
npm install


### 3. Start the frontend

bash
npm run dev


### 4. Install backend dependencies

Open a new terminal:

bash
cd backend
npm install


### 5. Configure environment variables

Create a `.env` file inside the backend directory and add the required environment variables for your local configuration.

Example:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Do not commit your `.env` file or any private credentials to GitHub.

### 6. Start the backend

bash
npm run dev


The frontend and backend can now run together in separate development terminals.

## Deployment

The application is deployed on Vercel for production access.

Live deployment:

https://elysia-ecommerce-five.vercel.app/

Environment variables required by the application should be configured through the deployment platform rather than committed to the repository.

## Project Goals

ELYSIA was developed as a practical full-stack project to strengthen real-world development skills across:

- Frontend architecture
- Backend API development
- Database integration
- Authentication
- State management
- Responsive design
- Deployment and production configuration

## Future Improvements

Potential future enhancements include:

- Online payment integration
- Order tracking
- Product reviews and ratings
- Advanced search and filtering
- Admin dashboard improvements
- Wishlist functionality
- Improved user account management
- Performance and accessibility optimization

## Developer

Unsa Rani 
Full-Stack Developer

GitHub:  
https://github.com/raniunsa24-coder

LinkedIn:  
https://www.linkedin.com/in/unsa-rani-02993a365/

Portfolio:  
https://unsa-rani-portfolio.netlify.app/

Built with React, Node.js, Express and MongoDB.
