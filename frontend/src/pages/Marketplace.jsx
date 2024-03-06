import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  // Function to fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
        <ProductForm onNewProduct={fetchProducts} />
        <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
            <ProductCard key={product._id} product={product} />
            ))}
        </div>
        </div>
    );
  };

export default Marketplace;


