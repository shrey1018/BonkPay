import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';


import ethereumLogo from './assets/ethereum.svg';
import solanaLogo from './assets/solana.svg';
import bonkLogo from './assets/bonk.png';

function App() {
  // State Management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [solAddress, setSolAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [ethBalance, setEthBalance] = useState(null);
  const [solBalance, setSolBalance] = useState(null);
  const [showPrivateKeys, setShowPrivateKeys] = useState(false);
  const [privateKeys, setPrivateKeys] = useState({ eth: '', sol: '' });
  const [transactions, setTransactions] = useState([]);

  // Utility Functions
  const fetchEthBalance = async (address) => {
    try {
      console.log("Fetching ETH balance for:", address);
      const cleanUrl = import.meta.env.VITE_ALCHEMY_ETH_URL.replace('https://https://', 'https://');
      const provider = new ethers.JsonRpcProvider(cleanUrl);
      const balance = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);
      console.log("ETH balance:", balanceInEth);
      setEthBalance(parseFloat(balanceInEth).toFixed(4));
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      setEthBalance('Error');
    }
  };

  const fetchSolBalance = async (address) => {
    try {
      console.log("Fetching SOL balance for:", address);
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      const balanceInSol = balance / LAMPORTS_PER_SOL;
      console.log("SOL balance:", balanceInSol);
      setSolBalance(balanceInSol.toFixed(4));
    } catch (error) {
      console.error('Error fetching SOL balance:', error);
      setSolBalance('Error');
    }
  };

  const refreshBalances = async () => {
    if (ethAddress) await fetchEthBalance(ethAddress);
    if (solAddress) await fetchSolBalance(solAddress);
  };

  // Authentication Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { username, password });
      setEthAddress(response.data.ethAddress);
      setSolAddress(response.data.solAddress);
      await refreshBalances(); // Fetch balances after login
      alert('Login successful!');
    } catch (error) {
      console.error(error);
      alert('Login failed.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/register', { username, password });
      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  // Transaction Handlers
  const handleEthTransaction = async (e) => {
    e.preventDefault();
    const toAddress = prompt('Enter Ethereum address to send to:');
    const amount = prompt('Enter amount of ETH to send:');
    
    if (!toAddress || !amount) return;

    try {
      const response = await axios.post('http://localhost:3000/api/users/send-eth', { 
        username, 
        toAddress, 
        amount 
      });
      
      // Update balance with the new balance from response
      if (response.data.newBalance) {
        setEthBalance(parseFloat(response.data.newBalance).toFixed(4));
      }

      const newTransaction = {
        type: 'ETH',
        hash: response.data.transactionHash,
        amount,
        to: toAddress,
        timestamp: new Date().toLocaleString(),
        status: 'success'
      };
      setTransactions(prev => [newTransaction, ...prev]);
      
      setTransactionStatus(`ETH Transaction sent: ${response.data.transactionHash}`);
      
      // Refresh balances after transaction
      setTimeout(refreshBalances, 1000);
    } catch (error) {
      console.error(error);
      setTransactionStatus('ETH transaction failed.');
      const failedTransaction = {
        type: 'ETH',
        amount,
        to: toAddress,
        timestamp: new Date().toLocaleString(),
        status: 'failed',
        error: error.response?.data?.message || error.message
      };
      setTransactions(prev => [failedTransaction, ...prev]);
    }
  };

  const handleSolTransaction = async (e) => {
    e.preventDefault();
    const toAddress = prompt('Enter Solana address to send to:');
    const amount = prompt('Enter amount of SOL to send:');
    
    if (!toAddress || !amount) return;

    try {
      const response = await axios.post('http://localhost:3000/api/users/send-sol', { 
        username, 
        toAddress, 
        amount 
      });
      
      // Update balance with the new balance from response
      if (response.data.newBalance) {
        setSolBalance(parseFloat(response.data.newBalance).toFixed(4));
      }

      const newTransaction = {
        type: 'SOL',
        signature: response.data.transactionSignature,
        amount,
        to: toAddress,
        timestamp: new Date().toLocaleString(),
        status: 'success'
      };
      setTransactions(prev => [newTransaction, ...prev]);
      
      setTransactionStatus(`SOL Transaction sent: ${response.data.transactionSignature}`);
      
      // Refresh balances after transaction
      setTimeout(refreshBalances, 1000);
    } catch (error) {
      console.error(error);
      setTransactionStatus('SOL transaction failed.');
      const failedTransaction = {
        type: 'SOL',
        amount,
        to: toAddress,
        timestamp: new Date().toLocaleString(),
        status: 'failed',
        error: error.response?.data?.message || error.message
      };
      setTransactions(prev => [failedTransaction, ...prev]);
    }
  };

  const handleShowPrivateKeys = async () => {
    try {
      // If we're hiding the keys, just toggle the state
      if (showPrivateKeys) {
        setShowPrivateKeys(false);
        return;
      }
  
      // If we're showing the keys, fetch them first
      console.log("Fetching private keys for user:", username);
      const response = await axios.post('http://localhost:3000/api/users/private-keys', { 
        username,
        password // Add password for security
      });
      
      console.log("Private keys response received");
      
      if (response.data.ethPrivateKey && response.data.solPrivateKey) {
        setPrivateKeys({
          eth: response.data.ethPrivateKey,
          sol: response.data.solPrivateKey
        });
        setShowPrivateKeys(true);
      } else {
        console.error("Invalid response format:", response.data);
        alert('Failed to fetch private keys: Invalid response format');
      }
    } catch (error) {
      console.error('Private key fetch error:', error);
      alert(`Failed to fetch private keys: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEjectUser = async () => {
    if (window.confirm('Are you sure you want to delete your account? This will remove your data from our database but preserve your wallet keys.')) {
      const confirmPassword = prompt('Please enter your password to confirm deletion:');
      
      if (!confirmPassword) {
        alert('Password required for account deletion.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/users/eject', {
          username: username,
          password: confirmPassword  // Use the newly entered password
        });
        
        setPrivateKeys({
          eth: response.data.ethPrivateKey,
          sol: response.data.solPrivateKey
        });
        setShowPrivateKeys(true);
        alert('Account deleted. SAVE YOUR PRIVATE KEYS NOW!');
        
        // Clear user state after successful deletion
        setUsername('');
        setPassword('');
        setEthAddress('');
        setSolAddress('');
        setTransactions([]);
        
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Failed to delete account.');
      }
    }
  };

  // Effect for automatic balance updates
  useEffect(() => {
    if (ethAddress || solAddress) {
      refreshBalances();
      
      // Set up interval to refresh balances every 30 seconds
      const intervalId = setInterval(refreshBalances, 30000);
      
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [ethAddress, solAddress]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48"></div>
      </div>

      {/* Floating crypto icons */}
      <div className="absolute top-10 left-10 animate-float">
        <img src={ethereumLogo} alt="Ethereum" className="w-12 h-12" />
      </div>
      <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1s' }}>
        <img src={solanaLogo} alt="Solana" className="w-12 h-12" />
      </div>

      <div className="animate-fadeIn max-w-md w-full backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-8 animate-float">
          <img src={bonkLogo} alt="BonkPay" className="w-16 h-16 mr-4" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
            BonkPay
          </h1>
        </div>

        {!ethAddress && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-medium hover:opacity-90 hover:scale-105 transition-all animate-glow"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-medium hover:opacity-90 hover:scale-105 transition-all animate-glow"
              >
                Register
              </button>
            </div>
          </div>
        )}

        {ethAddress && solAddress && (
          <div className="mt-6 space-y-4 animate-slideUp">
            {/* Wallet Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 backdrop-blur-md">
                <div className="flex items-center mb-2">
                  <img src={ethereumLogo} alt="ETH" className="w-6 h-6 mr-2" />
                  <p className="text-yellow-400 font-medium">Ethereum</p>
                </div>
                <p className="text-gray-200 break-all text-sm">{ethAddress}</p>
                <p className="text-yellow-400 mt-2 text-lg font-bold">{ethBalance} ETH</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30 backdrop-blur-md">
                <div className="flex items-center mb-2">
                  <img src={solanaLogo} alt="SOL" className="w-6 h-6 mr-2" />
                  <p className="text-purple-400 font-medium">Solana</p>
                </div>
                <p className="text-gray-200 break-all text-sm">{solAddress}</p>
                <p className="text-purple-400 mt-2 text-lg font-bold">{solBalance} SOL</p>
              </div>
            </div>

            {showPrivateKeys && (
              <div className="mt-4 border-t border-gray-500/30 pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">ETH Private Key:</p>
                    <p className="text-gray-200 break-all">{privateKeys.eth}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">SOL Private Key:</p>
                    <p className="text-gray-200 break-all">{privateKeys.sol}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleEthTransaction}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Send ETH
            </button>

            <button
              onClick={handleSolTransaction}
              className="w-full py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Send SOL
            </button>

            <button
              onClick={handleShowPrivateKeys}
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {showPrivateKeys ? 'Hide Private Keys' : 'Show Private Keys'}
            </button>

            <button
              onClick={handleEjectUser}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Eject User (Delete Account)
            </button>

            {transactionStatus && (
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-gray-500/30 animate-fadeIn">
                <p className="text-gray-200 text-center text-sm break-all whitespace-normal">
                  {transactionStatus}
                </p>
              </div>
            )}

            {transactions.length > 0 && (
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-gray-500/30 backdrop-blur-md">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                  Transaction History
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {transactions.map((tx, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg transition-all ${
                        tx.status === 'success' 
                          ? 'bg-emerald-900/20 border border-emerald-500/20' 
                          : 'bg-red-900/20 border border-red-500/20'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${
                            tx.type === 'ETH' ? 'text-yellow-400' : 'text-purple-400'
                          }`}>
                            {tx.type}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-300">{tx.amount} {tx.type}</span>
                        </div>
                        <span className="text-xs text-gray-400">{tx.timestamp}</span>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm text-gray-400 truncate">
                          To: {tx.to}
                        </p>
                        {tx.status === 'success' ? (
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {tx.type === 'ETH' ? 'Hash: ' : 'Signature: '}
                            <a 
                              href={tx.type === 'ETH' 
                                ? `https://sepolia.etherscan.io/tx/${tx.hash}`
                                : `https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`
                              } 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              {tx.type === 'ETH' ? tx.hash : tx.signature}
                            </a>
                          </p>
                        ) : (
                          <p className="text-xs text-red-400 mt-1">
                            Error: {tx.error}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;