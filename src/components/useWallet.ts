import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [balanceInfo, setBalanceInfo] = useState({
        address: "-",
        balance: "-",
      });

const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];

        setBalanceInfo((prev) => ({ ...prev, address }));
        setWalletConnected(true);
      } catch (error) {
        console.error("Errore nella connessione al wallet:", error);
      }
    } else {
      alert("MetaMask non è installato!");
    }
  };

  const getBalance = async () => {
      if (window.ethereum && balanceInfo.address !== "-") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balance = await provider.getBalance(balanceInfo.address);
          const formattedBalance = ethers.formatEther(balance);
  
          setBalanceInfo((prev) => ({ ...prev, balance: formattedBalance }));
        } catch (error) {
          console.error("Errore nel recupero del saldo:", error);
        }
      } else {
        alert("Connetti prima il wallet!");
      }
    };

    return { walletConnected, balanceInfo, connectWallet, getBalance };

}