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
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed!");
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
          console.error("Error retrieving balance:", error);
        }
      } else {
        alert("Connect your wallet first!");
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
          console.error("Chain check error:", error);
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