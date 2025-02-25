# RideChain Web App - Decentralized Carpooling Platform

RideChain Web App is a decentralized carpooling platform built with React, leveraging Cardano's blockchain to provide a transparent, secure, and flexible ride-sharing experience. It empowers users to interact directly without intermediaries, ensuring affordable transportation options tailored for cost-conscious economies like Ghana.

---
## 🌟 Features
- **Decentralized Carpooling**: Connects drivers and passengers directly, bypassing intermediaries.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Trip Management**: Allows drivers to create and manage trips while enabling passengers to browse and book rides.
- **Real-Time Monitoring Dashboard**: Comprehensive dashboard for monitoring trips, bookings, payments, and user activity in real-time.
- **Analytics & Reports**: Detailed analytics and reports for platform usage, trip metrics, and financial transactions.
- **Admin & Management Panel**: Role-based access for administrators to manage users, trips, and transactions.
- **Blockchain-Powered Security**: Utilizes Decentralized Identity (DID) for secure user verification.
- **Smart Contract Payments**: Transparent payments using Cardano's ADA token with escrow for security.
- **Real-Time Notifications**: Instant updates for trip bookings, cancellations, and payments.
- **Decentralized Carpooling**: Connects drivers and passengers directly, bypassing intermediaries.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Trip Management**: Allows drivers to create and manage trips while enabling passengers to browse and book rides.
- **Blockchain-Powered Security**: Utilizes Decentralized Identity (DID) for secure user verification.
- **Smart Contract Payments**: Transparent payments using Cardano's ADA token with escrow for security.
- **Real-Time Notifications**: Instant updates for trip bookings, cancellations, and payments.

---
## 🚀 Tech Stack
- **Frontend**: React (JavaScript/TypeScript)
- **State Management**: Redux Toolkit
- **UI Framework**: Tailwind CSS & Ant Design (for dashboard components)
- **Charts & Visualization**: Recharts & Chart.js for advanced data visualization on the monitoring dashboard
- **Backend Integration**: Django Rest Framework (via REST APIs)
- **Blockchain Integration**: Cardano Blockchain
- **Smart Contracts**: Plutus and Marlowe
- **Security**: Decentralized Identity (DID) and Smart Contract Escrow
- **Payment System**: Cardano's native ADA token
- **Frontend**: React (JavaScript/TypeScript)
- **State Management**: Redux Toolkit
- **UI Framework**: Tailwind CSS
- **Backend Integration**: Django Rest Framework (via REST APIs)
- **Blockchain Integration**: Cardano Blockchain
- **Smart Contracts**: Plutus and Marlowe
- **Security**: Decentralized Identity (DID) and Smart Contract Escrow
- **Payment System**: Cardano's native ADA token

---
## 📁 Project Structure
The project follows a clean architecture design pattern with a modular structure for scalability and maintainability.

```
ridechain_web/
│   package.json           # Project dependencies and scripts
│   tailwind.config.js     # Tailwind CSS configuration
│   postcss.config.js      # PostCSS configuration
│   tsconfig.json          # TypeScript configuration
│   .env                   # Environment variables
│   .gitignore             # Git ignore settings
│
├── src/
│   ├── assets/            # Static assets (images, icons, fonts)
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components (Home, Trips, Dashboard, Profile, etc.)
│   ├── dashboard/         # Monitoring dashboard components and data visualizations
│   ├── reports/           # Analytics and reporting modules
│   ├── redux/             # State management (slices and store configuration)
│   ├── services/          # API clients and blockchain integrations
│   └── utils/             # Utility functions and constants
│
└── public/
    └── index.html         # Root HTML template
```

This modular structure allows easy maintenance and future scalability, particularly for the monitoring dashboard and management panel.
The project follows a clean architecture design pattern with a modular structure for scalability and maintainability.

```
ridechain_web/
│   package.json           # Project dependencies and scripts
│   tailwind.config.js     # Tailwind CSS configuration
│   postcss.config.js      # PostCSS configuration
│   tsconfig.json          # TypeScript configuration
│   .env                   # Environment variables
│   .gitignore             # Git ignore settings
│
├── src/
│   ├── assets/            # Static assets (images, icons, fonts)
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components (Home, Trips, Profile, etc.)
│   ├── redux/             # State management (slices and store configuration)
│   ├── services/          # API clients and blockchain integrations
│   └── utils/             # Utility functions and constants
│
└── public/
    └── index.html         # Root HTML template
```

---
## 🔧 Installation & Setup
1. **Clone the Repository:**
```
git clone https://github.com/your-username/ridechain-web.git
cd ridechain-web
```
2. **Install Dependencies:**
```
npm install
```
3. **Start Development Server:**
```
npm start
```
4. **Build for Production:**
```
npm run build
```
5. **Environment Variables:**
Create a `.env` file in the root directory and add the following:
```
REACT_APP_API_URL=your_backend_api_url
REACT_APP_CARDANO_NETWORK=mainnet
REACT_APP_ADA_PAYMENT_GATEWAY=payment_gateway_url
```

---
## 🔗 API Integration
The web app integrates with the RideChain backend via REST APIs, including:
- **User Authentication**: Registration, Login, and DID Verification
- **Trip Management**: Creating, browsing, booking, updating, and canceling trips
- **Payment Processing**: Smart contract-based payments using ADA
- **Monitoring & Analytics**: Real-time monitoring of trips, user activity, and financial transactions
- **Reports Generation**: Detailed reports for admins on platform usage, bookings, and payments
- **Admin Panel Management**: Role-based access for user, trip, and transaction management
The web app integrates with the RideChain backend via REST APIs, including:
- **User Authentication**: Registration, Login, and DID Verification
- **Trip Management**: Creating, browsing, booking, and canceling trips
- **Payment Processing**: Smart contract-based payments using ADA

---
## 🌐 Deployment
The web app is optimized for deployment on:
- **Vercel**: Seamless deployment and CI/CD integration.
- **Netlify**: Easy configuration and environment management.
- **AWS Amplify**: Scalable and secure hosting.

---
## 📜 License
This project is licensed under the MIT License.

---
## 🤝 Contributing
We welcome contributions! Please read `CONTRIBUTING.md` for guidelines.

---
## 👥 Team & Acknowledgments
- **Project Lead**: [Your Name](https://linkedin.com)
- **Frontend Developer**: React & User Experience
- **Backend Developer**: Django Rest Framework & Cardano Integration
- **Blockchain Developer**: Smart Contracts & Security
- **Special Thanks**: Accra Resource Center for local support and user onboarding

---
## 📞 Contact
For any inquiries, please reach out to [Your Email].
