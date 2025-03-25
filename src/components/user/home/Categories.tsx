import { Link } from "react-router-dom";
import womenImage from "../../../images/Screenshot 2025-03-25 120437.png";
import menImage from "../../../images/Screenshot 2025-03-25 125030.png";
import kidsImage from "../../../images/little-girl-studio.jpg";
import accessoriesImage from "../../../images/top-view-arrangement-different-traveling-elements.jpg";

const Categories = () => {
  const categories = [
    {
      name: "Women",
      image: womenImage,
      description: "Discover our elegant collection of women's fashion",
      path: "/categoryitems?category=women"
    },
    {
      name: "Men",
      image: menImage,
      description: "Explore our stylish men's clothing collection",
      path: "/categoryitems?category=men"
    },
    {
      name: "Kids",
      image: kidsImage,
      description: "Adorable and comfortable clothing for little ones",
      path: "/categoryitems?category=kids"
    },
    {
      name: "Accessories",
      image: accessoriesImage,
      description: "Complete your look with our trendy accessories",
      path: "/categoryitems?category=accessories"
    }
  ];

  return (
    <div   className=" mx-auto px-4 py-16 bg-rose-100">
      <h2 id="category" className="text-3xl font-serif font-bold text-rose-800 text-center mb-12">
        Shop by Category
      </h2>
      <p className="text-center text-rose-600 mb-12 text-lg max-w-2xl mx-auto">
          Discover our  collection of fashion categories, each designed to bring out your unique style
        </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
          <Link 
            to="categoryitems" 
            className="inline-block bg-rose-800 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors duration-200"
          >
            View All Categories
          </Link>
        </div>
    </div>
  );
};

export default Categories;
