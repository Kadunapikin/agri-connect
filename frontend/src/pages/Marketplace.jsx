import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const Marketplace = () => {
  const [products, setProducts] = useState([]); // Stores the full list of products
  const [showForm, setShowForm] = useState(false); // Controls the visibility of ProductForm
  const [editingProduct, setEditingProduct] = useState(null); // Holds the product to edit
  const [searchTerm, setSearchTerm] = useState(''); // Stores the current search term

  // Fetch products from backend
  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProducts(data);
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    fetchProducts(); // Refresh list after deletion
  };

  // Function to initiate editing a product
  const startEditing = (product) => {
    setEditingProduct(product); // Set product to edit
    setShowForm(true); // Show the ProductForm
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-3 py-2 border rounded shadow"
      />
      <button
        onClick={() => {
          setEditingProduct(null); // Reset product to edit
          setShowForm(!showForm); // Toggle form visibility
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
            setEditingProduct(null); // Clear editing state after product is edited
          }}
        />
      )}
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} onDelete={deleteProduct} onEdit={startEditing} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
