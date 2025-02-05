<div align="center">
  <img src="bonkpay-frontend/src/assets/bonk.png" alt="BonkPay Logo" width="200"/>

  # BonkPay - Multi-Chain Crypto Wallet
  
  <p align="center">
    A modern, secure crypto wallet supporting Ethereum and Solana chains with a sleek UI
  </p>

  <div>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" alt="Ethereum"/>
    <img src="https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=Solana&logoColor=white" alt="Solana"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  </div>
</div>

## 🎥 Demo Video

[![BonkPay Demo](https://img.youtube.com/vi/SJ6JZ5TfxQk/0.jpg)](https://www.youtube.com/watch?v=SJ6JZ5TfxQk)

## 🌟 Features

- **Multi-Chain Support**: Seamlessly manage both Ethereum and Solana wallets
- **Secure Key Management**: Encrypted storage of private keys
- **Real-time Balance Updates**: Live balance tracking for both chains
- **Transaction History**: Detailed transaction tracking and history
- **User Authentication**: Secure login and registration system
- **Account Recovery**: Private key backup and recovery system
- **Modern UI**: Responsive and intuitive interface with animations

## 🏗️ Architecture

### Backend Infrastructure

The backend is built with a robust architecture focusing on security and scalability:

- **Express Server**: Handles API requests and middleware operations
- **MongoDB**: Stores encrypted user data and wallet information
- **Web3 Integration**: Direct connections to Ethereum and Solana networks
- **Authentication Layer**: JWT-based secure user sessions

### Web3 Integration

#### Ethereum Integration
- Uses `ethers.js` v6.13.5 for wallet management
- Connects to Ethereum Sepolia testnet via Alchemy
- Supports:
  - ETH transfers
  - Real-time balance checks
  - Transaction history tracking
  - Gas estimation

#### Solana Integration
- Implements `@solana/web3.js` v1.98.0
- Connects to Solana devnet
- Features:
  - SOL transfers
  - Account balance monitoring
  - Transaction signatures
  - Lamport conversions

## 🛠️ Technical Stack

### Frontend
- React 18.2.0 with Vite
- TailwindCSS for styling
- Framer Motion for animations
- Axios for API calls
- Web3 libraries integration

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled API endpoints

## 🚀 Getting Started

1. **Clone the repository**
bash
git clone https://github.com/yourusername/bonkpay.git

2. **Install dependencies**

```bash
# Frontend
cd bonkpay-frontend
npm install

# Backend
cd ../bonkpay-backend
npm install
```

3. **Set up environment variables**

Create `.env` files in both frontend and backend directories:

```env
# Backend .env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000

# Frontend .env
VITE_ALCHEMY_ETH_URL=your_alchemy_url
```

4. **Run the application**
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

## 🔐 Security Features

- **Private Key Encryption**: Secure storage of wallet keys
- **Password Hashing**: Using bcrypt with salt rounds
- **JWT Authentication**: Secure API access
- **Protected Routes**: Authorization middleware
- **CORS Protection**: Configured security headers

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Dark Theme**: Modern dark mode interface
- **Interactive Elements**: 
  - Floating animations
  - Gradient effects
  - Loading states
  - Transaction notifications
- **Real-time Updates**: Live balance and transaction tracking

## 📱 Key Interfaces

### Wallet Management
- Unified dashboard for ETH and SOL
- Real-time balance display
- Transaction history view
- Send/Receive functionality

### Security
- Secure login/registration
- Private key backup
- Account recovery options
- Transaction confirmation dialogs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ethereum and Solana development communities
- React and Node.js ecosystems
- All contributors and supporters
- Special thanks to Web3 developers worldwide

---

<div align="center">
  <p>Built with ❤️ by ME </p>
</div>