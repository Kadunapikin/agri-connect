import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false); // Controls visibility of ProductForm
  const [editingProduct, setEditingProduct] = useState(null); // Holds the product to edit

  // Fetch products from backend
  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProducts(data);
  };

  // Delete a product
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    fetchProducts(); // Refresh list after deletion
  };

  // Initialize editing a product
  const startEditing = (product) => {
    setEditingProduct(product); // Set product to edit
    setShowForm(true); // Show the ProductForm
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <button
        onClick={() => {
          setEditingProduct(null); // Ensure no product is set for editing when adding a new one
          setShowForm(!showForm);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline"
      >
        {showForm ? 'Cancel' : 'Add Product'}
      </button>
      {showForm && (
        <ProductForm
          onNewProduct={fetchProducts}
          productToEdit={editingProduct}
          onProductEdited={() => {
            fetchProducts();
            setShowForm(false);
            setEditingProduct(null); // Clear editing state
          }}
        />
      )}
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onDelete={deleteProduct} onEdit={startEditing} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;