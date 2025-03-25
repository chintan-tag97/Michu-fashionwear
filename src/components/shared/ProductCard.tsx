import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isAddingToCart?: boolean;
  variant?: 'default' | 'rose';
}

const ProductCard = ({ product, onAddToCart, isAddingToCart = false, variant = 'default' }: ProductCardProps) => {
  const getColorClasses = () => {
    return {
      title: 'text-rose-800 group-hover:text-rose-900',
      description: 'text-rose-600',
      price: 'text-rose-900',
      button: 'bg-rose-900 hover:bg-rose-800',
    };
  };

  const colors = getColorClasses();

  return (
    <div className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
        <Link to={`/products/${product.id}`}>
          <div className="relative h-80 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="p-6">
          <Link to={`/products/${product.id}`}>
            <h3 className={`text-xl font-serif font-bold mb-2 transition-colors duration-200 ${colors.title}`}>
              {product.name}
            </h3>
          </Link>
          <p className={`text-sm mb-4 line-clamp-2 ${colors.description}`}>
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${colors.price}`}>
                ${product.price}
              </span>
            </div>
            <button
              onClick={() => onAddToCart(product)}
              disabled={isAddingToCart}
              className={`text-white px-4 py-2 rounded-lg transition-colors duration-200 ${colors.button} ${
                isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 