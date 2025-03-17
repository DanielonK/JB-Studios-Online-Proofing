# JB Studios Online Proofing Gallery and Booking System

## Project Overview
JB Studios Online Proofing Gallery and Booking System is a web-based platform designed to streamline client bookings, securely manage proofing galleries, enhance client interactions, and simplify payment processing. The goal is to digitize and optimize JB Studios' photography and videography workflow, significantly improving operational efficiency and client satisfaction.

## Key Features
- **Online Proofing Gallery:** Securely share and manage raw and edited photos and videos for client review and selection.
- **Real-time Booking System:** Allow clients to schedule various photography sessions with immediate availability confirmation.
- **Secure Payment Integration:** Process secure transactions using integrated payment gateways (Stripe).
- **Mobile Responsiveness:** Fully responsive platform accessible via desktop, tablet, and mobile devices.
- **Real-time Communication:** Integrated chat system for seamless communication between clients and JB Studios.

## Technologies Used

### Frontend:
- React.js
- Tailwind CSS / Bootstrap
- Axios for API requests

### Backend:
- Node.js with Express framework
- Sequelize ORM with SQL databases (MySQL/PostgreSQL)
- JWT Authentication
- Stripe API for payments
- Socket.IO for real-time communication

### DevOps & Deployment:
- Docker for containerization
- GitHub Actions for CI/CD pipeline
- Hosting on AWS or Heroku

## Project Structure
```
JB-Studios-Online-Proofing/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── tests/
├── scripts/
├── docs/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## CI/CD Workflow
GitHub Actions automates the project's continuous integration and deployment, ensuring the code is tested, built, and securely deployed upon each commit to the `main` branch.

## Getting Started

### Prerequisites:
- Git
- Node.js
- Docker

### Installation:
```bash
# Clone repository
git clone https://github.com/yourusername/JB-Studios-Online-Proofing.git

# Navigate to the project directory
cd JB-Studios-Online-Proofing

# Install Frontend dependencies
cd frontend
npm install

# Install Backend dependencies
cd ../backend
npm install
```

### Running the Project:

#### Frontend:
```bash
cd frontend
npm start
```

#### Backend:
```bash
cd backend
npm run dev
```

### Running with Docker:
```bash
docker-compose up
```

## Security
- JWT authentication is used to secure routes and API endpoints.
- Secure payment transactions processed through Stripe API.
- SSL encryption for secure data transfer.

## Dissertation Context
This project forms part of a dissertation titled **"Online Proofing Gallery and Booking System for JB Studios"**, integrating Agile/Rapid Application Development (RAD) methodologies, and incorporating DevOps best practices like CI/CD pipelines, containerization, and cloud deployment.

## Future Work
- AI-based image recognition for automatic photo sorting.
- Expansion to support advanced video proofing features.
- Enhanced analytics for booking patterns and client preferences.

## Contact
Danielon Aboagye  
Email: your-email@example.com

