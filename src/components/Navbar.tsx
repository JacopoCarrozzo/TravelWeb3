import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" p-4 mt-4">
      <div className="container mx-auto flex justify-center">
        
        <ul className="flex space-x-6 text-gray-300">
          <li>
            <Link to="/" className="hover:text-black transition text-white">Home</Link>
          </li>
          <li>
            <Link to="/Travels" className="hover:text-black transition text-white">Travels</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
