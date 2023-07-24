import React, { useState } from 'react';
import './App.css';
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Request Airdrop
      const publicKeyObj = new PublicKey(inputValue);
      console.log(`Requesting airdrop for ${inputValue}`);
      const connection = new Connection(clusterApiUrl('testnet'));
      const signature = await connection.requestAirdrop(publicKeyObj, LAMPORTS_PER_SOL);

      // Log results
      console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
      setMessage(`Airdrop successful! Check your wallet for the received SOL tokens.`);
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      setMessage(`An error occurred: ${error.message}`);
    }
  };
       
  return (
    <div className="app">
      <h1>Submit Solana Public Testnet Address</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your Solana Address here"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;

