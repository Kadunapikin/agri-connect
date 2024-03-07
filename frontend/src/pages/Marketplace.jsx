import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of ProductForm

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

  // Function to delete a product
const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    // Refresh the products after deletion
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <button
        onClick={() => setShowForm(!showForm)} // Toggle the visibility of the ProductForm
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline"
      >
        {showForm ? 'Cancel' : 'Add Product'} 
      </button>
      {/* Conditional rendering based on showForm state */}
      {showForm && <ProductForm onNewProduct={() => { fetchProducts(); setShowForm(false); }} />}
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} onDelete={deleteProduct} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
