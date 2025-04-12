import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}


export const useWallet = (desiredChainId: number) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [balanceInfo, setBalanceInfo] = useState({
        address: "-",
        balance: "-",
      });
    const [correctChain, setCorrectChain] = useState(true);

const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];

        setBalanceInfo((prev) => ({ ...prev, address }));
        setWalletConnected(true);
        localStorage.setItem("walletConnected", "true");
  
        checkChain(desiredChainId);
        
        

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

    const checkChain = async (desiredChainId: number) => {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (parseInt(chainId) !== desiredChainId) { 
          setCorrectChain(false);
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${desiredChainId.toString(16)}` }],
              });
              setCorrectChain(true);
            } catch (switchError: any) {
              if (switchError.code === 4902) {
                try {
                  
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: `0x${desiredChainId.toString(16)}`,
                        chainName: "Ethereum Mainnet",
                        nativeCurrency: {
                          name: "Ethereum",
                          symbol: "ETH",
                          decimals: 18,
                        },
                      },
                    ],
                  });
                } catch (addError) {
                  console.error(addError);
                }
              }
              console.error(switchError);
            }
          } else {
            setCorrectChain(true);
          }
        } catch (error) {
          console.error("Errore nel controllo della chain:", error);
        }
      }
    };

    useEffect(() => {
      if (walletConnected) {
        checkChain(desiredChainId);
      }
    }, [walletConnected, desiredChainId]);

    useEffect(() => {
      const wasConnected = localStorage.getItem("walletConnected");
      if (wasConnected === "true") {
        connectWallet(); 
      }
    }, []);
    
    return { walletConnected, balanceInfo, connectWallet, getBalance, correctChain, checkChain };

}