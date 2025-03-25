import { Link } from "react-router-dom";
import { Category } from "../../types";
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, limit(4)); // Limit to 4 categories
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, 'id'>)
        })) as Category[];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-rose-600">Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-center mb-4 text-rose-800">
          Shop by Category
        </h2>
        <p className="text-center text-rose-600 mb-12 text-lg max-w-2xl mx-auto">
          Discover our curated collection of fashion categories, each designed to bring out your unique style
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2 text-rose-800 group-hover:text-rose-900 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-rose-600 group-hover:text-rose-700 transition-colors duration-200">
                    {category.description}
                  </p>
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
    </section>
  );
};

export default Categories;
