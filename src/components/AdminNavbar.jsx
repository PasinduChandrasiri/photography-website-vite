import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="fixed left-0 right-0 top-4 z-50">
      {/* Desktop Menu */}
      <div className="mx-auto hidden max-w-xl items-center justify-center rounded-lg bg-white/30 py-3 px-10 backdrop-blur-lg lg:flex gap-7">
        <div className="flex items-center gap-7 w-full justify-between">
          <div>
            <img src={logo} width={100} alt="logo" />
          </div>
          <Link to="/" className="text-white text-sm">Back to Site</Link>
          <button
            onClick={handleLogout}
            className="text-black bg-white rounded-3xl px-4 py-1 font-semibold hover:bg-gray-200 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="rounded-lg bg-white/30 backdrop-blur-md lg:hidden mx-5 px-10 py-3">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} width={90} alt="logo" className="m-2" />
          </div>
          <div className="flex items-center">
            <button className="focus:outline-none" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <FaTimes className="m-2 h-6 w-5" />
              ) : (
                <FaBars className="m-2 h-6 w-5" />
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <ul className="ml-4 mt-2 mb-2 py-4 px-10 flex flex-col gap-4 backdrop-blur-md bg-black rounded-3xl">
            <li>
              <Link
                to="/"
                className="pl-2 block w-full text-xl font-semibold rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Back to Site
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-36 items-start text-xl font-semibold text-center text-black bg-white rounded-3xl px-4 py-1 mt-2 hover:bg-gray-200 transition duration-300"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
