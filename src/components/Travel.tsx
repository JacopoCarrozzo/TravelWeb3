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
        name: "Dubai, Emirati Arabi",
        image: duabiImg,
        description: "Il futuro prende vita tra lusso e grattacieli nel deserto.",
        fulldescription:"Scopri Dubai, la perla futuristica degli Emirati Arabi Uniti, dove il lusso sfiora il cielo e la tradizione danza con l’innovazione. Lasciati incantare dai grattacieli mozzafiato come il Burj Khalifa, il più alto al mondo, e vivi l’esperienza unica dello shopping nei souk tradizionali o nei maestosi centri commerciali come il Dubai Mall. Rilassati su spiagge dorate, prova un safari tra le dune del deserto al tramonto, oppure lasciati coccolare in un resort a 5 stelle con vista sul Golfo Persico. Per gli amanti del divertimento e della cultura, Dubai è un mondo da esplorare: dal quartiere storico di Al Fahidi ai parchi a tema spettacolari come il Dubai Parks & Resorts.",
        price: 0.5
      },
      {
        name: "Capri, Italia",
        image: capriImg,
        description: "Un'isola da sogno nel cuore del Mediterraneo.",
        fulldescription:"Benvenuti a Capri, gioiello incastonato nel blu del Golfo di Napoli. Un’isola che ha conquistato imperatori romani, star internazionali e viaggiatori da tutto il mondo con il suo fascino senza tempo. Passeggia tra i vicoli fioriti di Anacapri, sorseggia un limoncello con vista sui Faraglioni, e lasciati avvolgere dal profumo del mare e del gelsomino. Scopri la magia della Grotta Azzurra, dove la luce crea riflessi da sogno, o sali sul Monte Solaro per una vista che ti toglierà il fiato. A Capri, ogni angolo è una cartolina: dalle boutique di lusso in Piazzetta alle terrazze con affaccio sul Mediterraneo.",
        price: 0.3
      },
      {
        name: "Parigi, Francia",
        image: parisimg,
        description: "La città dell'amore e della Torre Eiffel.",
        fulldescription:"Vivi la magia di Parigi, un luogo dove ogni strada racconta una storia, ogni monumento è un’icona, e ogni tramonto sulla Senna è poesia pura. Lasciati conquistare dal fascino senza tempo della Torre Eiffel, ammira le meraviglie artistiche del Louvre, e passeggia tra i vicoli bohémien di Montmartre, respirando l’atmosfera romantica e vivace della capitale francese. Gusta una crêpe calda passeggiando lungo gli Champs-Élysées, scopri i bistrot nascosti dove il vino è sempre buono e la compagnia ancora meglio. E quando cala la sera, Parigi si illumina di sogni: spettacoli, crociere notturne sulla Senna, e il profilo della città che brilla sotto le stelle.",
        price: 0.25
      
      },
      {
        name: "New York, USA",
        image: newyorkImg,
        description: "La città che non dorme mai, cuore della finanza e cultura.",
        fulldescription:"Preparati a vivere il ritmo travolgente di New York, metropoli iconica dove ogni sogno sembra possibile. Dalle luci abbaglianti di Times Square alla vista mozzafiato dalla cima dell’Empire State Building, ogni angolo della Grande Mela vibra di energia, cultura e stile. Passeggia tra i grattacieli di Manhattan, lasciati incantare da uno spettacolo a Broadway, oppure rilassati con un picnic a Central Park. Vivi l’atmosfera unica dei quartieri come SoHo, Brooklyn e Harlem, ognuno con la sua anima, le sue storie, la sua musica. E per gli amanti dello shopping? La 5th Avenue è un vero paradiso.",
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
          Le nostre destinazioni
        </h2>
      )}
      {!selectedDestination ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {travelDestinations.map((destination, index) => (
            <div key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleDestinationClick(destination)} // Gestisci il clic
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
  