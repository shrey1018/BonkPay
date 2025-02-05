<div align="center">
  <img src="bonkpay-frontend/src/assets/bonk.png" alt="BonkPay Logo" width="200"/>

  # ⚡ BonkPay
  ### Your Gateway to Multi-Chain Transactions

  <p align="center">
    <strong>A secure, non-custodial wallet for Ethereum and Solana</strong>
  </p>

  <br/>

  <div>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
    <img src="https://img.shields.io/badge/Ethereum-6B71E3?style=for-the-badge&logo=ethereum&logoColor=white" alt="Ethereum"/>
    <img src="https://img.shields.io/badge/Solana-14F195?style=for-the-badge&logo=solana&logoColor=black" alt="Solana"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  </div>

  <br/>

  <p align="center">
    <strong>🔒 Non-Custodial</strong> &nbsp;•&nbsp;
    <strong>⚡ Fast</strong> &nbsp;•&nbsp;
    <strong>🛡️ Secure</strong> &nbsp;•&nbsp;
    <strong>🌈 Modern UI</strong>
  </p>
</div>

## 🎯 Core Features

<div align="center">
  <table>
    <tr>
      <td align="center">🔐 <br/> Secure Key Generation</td>
      <td align="center">💸 <br/> ETH Transactions</td>
      <td align="center">☀️ <br/> SOL Transfers</td>
      <td align="center">📊 <br/> Balance Tracking</td>
    </tr>
  </table>
</div>

## 🔧 Technical Stack

### Frontend
- **Framework**: React 18.2 with Vite
- **Styling**: TailwindCSS with custom animations
- **Web3 Integration**: 
  - Ethers.js for Ethereum
  - @solana/web3.js for Solana
- **State Management**: React Hooks
- **API Communication**: Axios

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: Bcrypt for password hashing
- **Blockchain Connections**:
  - Ethereum (Sepolia Testnet)
  - Solana (Devnet)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/bonkpay.git

# Install dependencies
cd bonkpay-frontend && npm install
cd ../bonkpay-backend && npm install

# Set up environment variables
# Frontend (.env)
VITE_ALCHEMY_ETH_URL=your_alchemy_url
VITE_SOLANA_RPC=your_solana_rpc

# Backend (.env)
MONGO_URI=your_mongodb_uri
PORT=3000

# Start development servers
# Backend
npm run dev

# Frontend
npm run dev
```

## 💫 Key Features

### 🔒 Secure Wallet Generation
- Generates unique ETH and SOL wallets
- Non-custodial key management
- Encrypted storage in MongoDB

### 💎 Transaction Management
- Real-time balance updates
- Transaction history tracking
- Gas fee estimation
- Transaction status monitoring

### 🎨 Modern User Interface
- Responsive design
- Dark mode optimized
- Interactive animations
- Real-time updates

## 🌐 Connect

<div align="center">
  <a href="https://twitter.com/VagabondBushido">
    <img src="https://img.shields.io/badge/Follow_@VagabondBushido-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"/>
  </a>
</div>

<br/>

<div align="center">
  <p>
    <sub>Built with 💜 by BonkPay</sub>
  </p>
</div>