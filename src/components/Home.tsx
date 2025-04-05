import { useWallet } from "./useWallet";
import { useTransaction } from "./useTransaction";


function Home() {
  
  const { walletConnected, balanceInfo, connectWallet, getBalance } = useWallet();
  const { transferInfo, transactionSuccess, isTransactionPending, handleTransferChange, sendETH, setTransactionSuccess } = useTransaction(balanceInfo.address);

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
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
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

                <button
                  onClick={getBalance}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-4 duration-300"
                >
                  Get my balance
                </button>
              </>
            )}
          </div>

          {walletConnected && (
            <div className="max-w-xl mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">Send ETH</h3>

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
            </div>
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
