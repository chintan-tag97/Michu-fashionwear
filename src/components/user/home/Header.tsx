import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartItemCount } from "../../../utils/cartUtils";
// import logo from "../../images/IMG_20250324_205652.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const count = await getCartItemCount();
      setCartCount(count);
    };
    fetchCartCount();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { name: "Home", path: "/" },
    
    { name: "Products", path: "/popularitems" },
    { name: "Categories", path: "/categoryitems" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <header className="bg-gradient-to-r from-rose-50 to-pink-50 shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-rose-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* <img src={logo} alt="Michu FashionWear Logo" className="h-12 w-auto" /> */}
              <span className="text-4xl font-serif font-bold text-rose-800 hover:text-rose-900 transition-colors duration-200 tracking-tight">
                Michu 
              </span>
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-rose-700 hover:text-rose-900 hover:bg-rose-50 focus:outline-none transition-colors duration-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center space-x-12">
            <nav className="flex space-x-10">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="text-rose-700 hover:text-rose-900 font-medium transition-colors duration-200 relative group text-lg"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-8">
              <Link to="/cart" className="text-rose-700 hover:text-rose-900 transition-colors duration-200 relative group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 transform group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/account" className="text-rose-700 hover:text-rose-900 transition-colors duration-200 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 transform group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-gradient-to-b from-rose-50 to-pink-50 shadow-lg z-50 animate-fadeIn border-b border-rose-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-3 rounded-md text-lg font-medium text-rose-700 hover:text-rose-900 hover:bg-rose-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-rose-200 my-2"></div>
              <Link
                to="/cart"
                className="flex items-center px-4 py-3 rounded-md text-lg font-medium text-rose-700 hover:text-rose-900 hover:bg-rose-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="ml-2 bg-rose-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/account"
                className="flex items-center px-4 py-3 rounded-md text-lg font-medium text-rose-700 hover:text-rose-900 hover:bg-rose-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
