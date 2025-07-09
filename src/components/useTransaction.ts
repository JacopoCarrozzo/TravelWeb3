import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useTransaction = (address: string) =>{

    const [transferInfo, setTransferInfo] = useState({
        recipient: "",
        amount: "",
      });
    
      const [transactionSuccess, setTransactionSuccess] = useState(false);
      const [isTransactionPending, setIsTransactionPending] = useState(false); 
      const [errorMessage, setErrorMessage] = useState(""); 

    
      const handleTransferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTransferInfo((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const sendETH = async () => {
        const { recipient, amount } = transferInfo;
    
        if (!recipient || !amount) {
          alert("Please enter an address and amount!");
          return;
        }

        if (recipient.toLowerCase() === address.toLowerCase()) {
          setErrorMessage("You cannot send funds to yourself!");
          return;
        }
    
        if (window.ethereum && address !== "-") {
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
    
            const balance = await provider.getBalance(address);
            const balanceETH = ethers.formatEther(balance);
    
          
            if (parseFloat(balanceETH) < parseFloat(amount)) {
            setErrorMessage("Insufficient balance!");
            return;
            }

            setIsTransactionPending(true); 
            setTransactionSuccess(true); 
    
            const transaction = await signer.sendTransaction({
              to: recipient,
              value: ethers.parseEther(amount),
            });
    
            await transaction.wait(); 
            setIsTransactionPending(false); 
            setErrorMessage(""); 
          } catch (error) {
            console.error("Error sending transaction:", error);
            setTransactionSuccess(false); 
            setIsTransactionPending(false);
            setErrorMessage("Error during transaction.");
          }
        } else {
          alert("Connect your wallet first!");
        }
      };

      return { transferInfo, transactionSuccess, isTransactionPending, handleTransferChange, sendETH, setTransactionSuccess,  errorMessage, setTransferInfo  };


}

