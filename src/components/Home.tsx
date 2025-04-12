import { useEffect, useState } from "react";
import { useTransaction } from "./useTransaction";
import { useWallet } from "./useWallet";

interface ChainInfo {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

interface SupportedChains {
  [chainId: number]: ChainInfo;
}

const SUPPORTED_CHAINS: SupportedChains  = {
  1: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  
  137: {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  56: {
    chainId: "0x38",
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  11155111: {
    chainId: "0xaa36a7",
    chainName: "Sepolia Test Network",
    nativeCurrency: {
      name: "Sepolia Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
};

function Home() {
  
  const [selectedChain, setSelectedChain] = useState(11155111);
  const { walletConnected, balanceInfo, connectWallet, getBalance, correctChain, checkChain   } = useWallet(selectedChain);
  const { transferInfo, transactionSuccess, isTransactionPending, handleTransferChange, sendETH, setTransactionSuccess, errorMessage, setTransferInfo } = useTransaction(balanceInfo.address);
  

  useEffect(() => {
    if (walletConnected && balanceInfo.address !== "-") {
      getBalance();
    }
  }, [walletConnected, balanceInfo.address]);
  
  useEffect(() => {
    const bookingData = localStorage.getItem("bookingData");
    if (bookingData) {
      const { price, recipient } = JSON.parse(bookingData);
      setTransferInfo({
        recipient,
        amount: price.toString(),
      });
      localStorage.removeItem("bookingData");
    }
  }, [setTransferInfo]);

  const handleChainChange = (chainId: number) => {
    setSelectedChain(chainId);
    checkChain(chainId);
  };

 

  return (
    <>
    
     {!transactionSuccess ? (
        <>
          <div className="max-w-xl mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Wallet Connection
            </h2>

            {!walletConnected ? (
              <button
                onClick={connectWallet}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Connect Wallet
              </button>
            ) : (
              <>
                <div className="mt-6 overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full text-left bg-gray-50">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-3 text-gray-600">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 text-gray-800">{balanceInfo?.balance} ETH</td>
                      </tr>
                    </tbody>
                  </table>
                </div>                
              </>
            )}
          </div>

          { !correctChain && walletConnected && (
            <div className="max-w-xl mx-auto p-6 mt-4 bg-red-100 border-red-500 border-2 rounded-lg" >
                <p className = "text-red-700" > Si prega di cambiare alla chain corretta. </p>
            </div>
          )}

          { walletConnected && correctChain && (
            <>
            <div className="max-w-xl mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">Send ETH</h3>
              <select
        value={selectedChain}
        onChange={(e) => handleChainChange(Number(e.target.value))}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
      >
        {Object.keys(SUPPORTED_CHAINS).map((chainId) => {
          const chainIdNumber = Number(chainId);
          if (SUPPORTED_CHAINS[chainIdNumber]) {
            return (
              <option key={chainIdNumber} value={chainIdNumber}>
                {SUPPORTED_CHAINS[chainIdNumber].chainName}
              </option>
            );
          }
          return null;
        })}
      </select>
              <input
                type="text"
                name="recipient"
                placeholder="Recipient address"
                value={transferInfo.recipient}
                onChange={handleTransferChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="amount"
                placeholder="Amount (ETH)"
                value={transferInfo.amount}
                onChange={handleTransferChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendETH}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Send ETH
              </button>
              {errorMessage && (
              <div className="text-red-500 mt-2 text-center">{errorMessage}</div>
            )}
            </div>
            
            </>
          )}
        </>
      ) : (
        
        <div className="mt-6 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
          <h3 className={`text-xl font-semibold ${isTransactionPending ? "text-black" : "text-green-700"} mb-4`}>
            {isTransactionPending ? "Transazione in corso..." : "Transazione effettuata con successo!"}
          </h3>
          <p className="text-gray-700">
            {isTransactionPending ? "Attendi la conferma della transazione." : "La tua prenotazione è stata confermata."}
          </p>
          {!isTransactionPending && (
            <button
              onClick={() => setTransactionSuccess(false)}
              className="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Torna alla Home
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
