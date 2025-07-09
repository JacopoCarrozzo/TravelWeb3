import React from 'react';

interface InfoProps {
  name: string;
  image: string;
  description: string;
  fulldescription?: string; 
  price?: number;
  onBookClick: (price: number, recipient: string) => void;
}



const Info: React.FC<InfoProps> = ({ name, image, fulldescription, price, onBookClick }) => {
  
  const recipientAddress = "0xb1A3cE21620d30e7018Bc58263a9FdE943de912d";
  
  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="flex-grow flex">
        <div className="w-1/3 h-full mr-8">
          <div className="w-full h-full border-4 border-white rounded-lg">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-3/4 text-white">
          <h2 className="text-4xl font-bold mb-4">{name}</h2>
          <p className="text-lg">{fulldescription}</p>
          <p className="text-lg mt-6">Price: {price} ETH</p>
          <p className="text-lg">Ethereum Wallet Address: {recipientAddress}</p>
          <p className="text-lg">Blockchain: Sepolia Test Network</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto rounded-lg mt-8">
        <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={() => {
          console.log("Info: onBookClick chiamato con", price, recipientAddress);
          onBookClick(price || 0, recipientAddress)}
        }
        >
          Book the trip
        </button>
      </div>
    </div>
  );
};

export default Info;