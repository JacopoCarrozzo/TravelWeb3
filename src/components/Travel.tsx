import React, {useState} from "react";
import duabiImg from "../images/dubai.jpg";
import capriImg from "../images/italy.jpg";
import parisimg from "../images/france.jpg";
import newyorkImg from "../images/us.jpg";
import Info from "./Info";

interface TravelDestination {
  name: string;
  image: string;
  description: string;
  fulldescription?: string;
  price?: number;
}

interface TravelsProps {
  onBookClick: (price: number, recipient: string) => void;
}

const Travels: React.FC<TravelsProps> = ({ onBookClick }) => {
    const travelDestinations = [
      
      {
        name: "Dubai, United Arab Emirates",
        image: duabiImg,
        description: "The future comes to life between luxury and skyscrapers in the desert.",
        fulldescription:"Discover Dubai, the futuristic jewel of the United Arab Emirates, where luxury reaches the skies and tradition blends with innovation. Be enchanted by breathtaking skyscrapers like the Burj Khalifa, the tallest in the world, and enjoy a unique shopping experience in traditional souks or majestic malls like the Dubai Mall. Relax on golden beaches, experience a sunset desert safari, or indulge in a 5-star resort overlooking the Arabian Gulf. For lovers of entertainment and culture, Dubai is a world to explore: from the historic Al Fahidi district to spectacular theme parks like Dubai Parks & Resorts.",
        price: 0.5
      },
      {
        name: "Capri, Italy",
        image: capriImg,
        description: "A dream island in the heart of the Mediterranean.",
        fulldescription:"Welcome to Capri, a jewel nestled in the blue Gulf of Naples. An island that has captivated Roman emperors, international celebrities, and travelers from around the world with its timeless charm. Stroll through the flower-lined alleys of Anacapri, sip a limoncello overlooking the Faraglioni, and let the scent of sea and jasmine envelop you. Discover the magic of the Blue Grotto, where the light creates dreamy reflections, or climb Mount Solaro for a breathtaking view. On Capri, every corner is a postcard: from the luxury boutiques in the Piazzetta to the terraces overlooking the Mediterranean.",
        price: 0.3
      },
      {
        name: "Paris, France",
        image: parisimg,
        description: "The city of love and the Eiffel Tower.",
        fulldescription:"Experience the magic of Paris, a place where every street tells a story, every monument is iconic, and every sunset over the Seine is pure poetry. Let yourself be captivated by the timeless charm of the Eiffel Tower, admire the artistic wonders of the Louvre, and stroll through the bohemian alleys of Montmartre, absorbing the romantic and lively atmosphere of the French capital. Enjoy a warm crêpe while strolling along the Champs-Élysées, discover hidden bistros where the wine is always good and the company even better. And when evening falls, Paris lights up with dreams: shows, night cruises on the Seine, and the city skyline shimmering under the stars..",
        price: 0.25
      
      },
      {
        name: "New York, USA",
        image: newyorkImg,
        description: "The city that never sleeps, the heart of finance and culture.",
        fulldescription:"Get ready to experience the frenetic pace of New York, an iconic metropolis where every dream seems possible. From the dazzling lights of Times Square to the breathtaking view from the top of the Empire State Building, every corner of the Big Apple buzzes with energy, culture, and style. Stroll among Manhattan's skyscrapers, be enchanted by a Broadway show, or relax with a picnic in Central Park. Experience the unique atmosphere of neighborhoods like SoHo, Brooklyn, and Harlem, each with its own soul, its own stories, its own music. And for shopaholics? 5th Avenue is a true paradise.",
        price: 0.4
      
      }
    ];

    const [selectedDestination, setSelectedDestination] = useState<TravelDestination | null>(null);

    const handleDestinationClick = (destination: TravelDestination) => {
      setSelectedDestination(destination);
    };
  
    const handleCloseInfo = () => {
      setSelectedDestination(null);
    };
  
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {!selectedDestination && (
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Our destinations
        </h2>
      )}
      {!selectedDestination ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {travelDestinations.map((destination, index) => (
            <div key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleDestinationClick(destination)}
          >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{destination.name}</h3>
                <p className="text-gray-600 mt-2 text-sm">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="relative">
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={handleCloseInfo}
      >
        &times;
      </button>
       <Info {...selectedDestination} onBookClick={onBookClick} />
    </div>
  </div>
)}
      </div>
    );
  };
  
  export default Travels;
  