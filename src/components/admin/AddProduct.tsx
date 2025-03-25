import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import type { ProductData } from '../../types/index';
import FormComponent from '../shared/FormComponent';

const categories = [
  { id: 'women', name: 'Women' },
  { id: 'men', name: 'Men' },
  { id: 'kids', name: 'Kids' },
  { id: 'accessories', name: 'Accessories' }
];

interface AddProductProps {
  onProductAdded: () => void;
}

const AddProduct = ({ onProductAdded }: AddProductProps) => {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    isPopular: false,
    createdAt: new Date().toISOString(),
    categoriesid: 'women' // Default category
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: Number(formData.price),
        createdAt: new Date().toISOString()
      });

      setSuccess('Product added successfully!');
      onProductAdded();
      
      // Reset form
      setFormData({
        name: '',
        price: 0,
        imageUrl: '',
        description: '',
        isPopular: false,
        createdAt: new Date().toISOString(),
        categoriesid: 'women'
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      value: formData.name
    },
    {
      name: 'categoriesid',
      label: 'Category',
      type: 'select',
      value: formData.categoriesid,
      options: categories.map(cat => ({ value: cat.id, label: cat.name }))
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      value: formData.price
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'text',
      value: formData.imageUrl
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      value: formData.description,
      rows: 4
    },
    {
      name: 'isPopular',
      label: 'Add to Popular Products',
      type: 'checkbox',
      value: formData.isPopular
    }
  ];

  return (
    <div className="relative min-h-[1480px]">
     
      <div className="relative z-10">
        <FormComponent
          fields={formFields}
          onSubmit={handleSubmit}
          onChange={handleChange}
          submitButtonText="Add Product"
          loading={loading}
          error={error}
          success={success}
          title="Add New Product"
        />
      </div>
    </div>
  );
};

export default AddProduct; 