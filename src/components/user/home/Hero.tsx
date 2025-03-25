import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div id="about" className="relative overflow-hidden h-[600px]">
      <div className="absolute inset-0 bg-[url('src/images/Screenshot%202025-03-25%20144626.png')] bg-cover bg-top opacity-30 transition-opacity duration-1000 hover:opacity-40"></div>
      <div className="container mx-auto px-4 py-24 relative">
        <div className="transform transition-transform duration-700 hover:scale-105">
          <h4 className="text-3xl text-center md:text-6xl font-serif font-bold text-rose-800 mb-6 leading-tight animate-fade-in">
            Discover Your Style with
            <p className="transform transition-transform duration-700 hover:scale-105"> Michu FashionWear</p>
          </h4>
          
          <p className="text-xl text-center text-rose-600 mb-8 leading-relaxed animate-fade-in-up">
            Explore our latest collection of trendy fashion pieces designed to make you feel confident and beautiful.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/categoryitems"
              className="px-8 py-4 bg-rose-900 text-white rounded-full font-medium hover:bg-rose-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
            >
              Shop Now
            </Link>
            <Link
              to="popularitems"
              className="px-8 py-4 bg-white text-rose-900 border-2 border-rose-900 rounded-full font-medium hover:bg-rose-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
            >
              Popular Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 