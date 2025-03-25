import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative  overflow-hidden">
      <div className="absolute inset-0 bg-[url('src/images/front-view-woman-posing-with-monochrome-outfit.jpg')] bg-cover bg-top opacity-10"></div>
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-rose-800 mb-6 leading-tight">
            Discover Your Style with Michu FashionWear
          </h1>
          <p className="text-xl text-rose-600 mb-8 leading-relaxed">
            Explore our latest collection of trendy fashion pieces designed to make you feel confident and beautiful.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/categoryitems"
              className="px-8 py-4 bg-rose-900 text-white rounded-full font-medium hover:bg-rose-800 transition-colors duration-200 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              to="popularitems"
              className="px-8 py-4 bg-white text-rose-900 border-2 border-rose-900 rounded-full font-medium hover:bg-rose-50 transition-colors duration-200 transform hover:-translate-y-1 hover:shadow-lg"
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