import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Travels from "./components/Travel";

function App() {
  const handleBookClick = (price: number, recipient: string) => {
    localStorage.setItem("bookingData", JSON.stringify({ price, recipient }));
    window.location.href = "/";
  };
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travels" element={<Travels onBookClick={handleBookClick} />}/>
      </Routes>
    </Router>
  );
}

export default App;