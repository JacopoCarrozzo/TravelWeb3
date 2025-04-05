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
          alert("Per favore, inserisci un indirizzo e un importo!");
          return;
        }
    
        if (window.ethereum && address !== "-") {
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
    
            setIsTransactionPending(true); 
            setTransactionSuccess(true); 
    
            const transaction = await signer.sendTransaction({
              to: recipient,
              value: ethers.parseEther(amount),
            });
    
            await transaction.wait(); 
            setIsTransactionPending(false); 
          } catch (error) {
            console.error("Errore nell'invio della transazione:", error);
            setTransactionSuccess(false); 
            setIsTransactionPending(false);
          }
        } else {
          alert("Connetti prima il wallet!");
        }
      };

      return { transferInfo, transactionSuccess, isTransactionPending, handleTransferChange, sendETH, setTransactionSuccess };


}

