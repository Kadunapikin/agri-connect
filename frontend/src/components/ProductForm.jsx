import React, { useState, useEffect } from 'react';

const ProductForm = ({ onNewProduct, productToEdit, onProductEdited }) => {
  // State for form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Effect to pre-fill form when editing a product
  useEffect(() => {
    if (productToEdit) {
      // If editing a product, fill the form with the current product details
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price.toString()); // Ensure price is a string to match input field expectation
    } else {
      // Reset form fields for adding a new product
      setName('');
      setDescription('');
      setPrice('');
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, description, price: parseFloat(price) }; // Prepare product data
    // Determine the request URL and method based on whether we're adding or editing a product
    const url = productToEdit ? `http://localhost:5000/api/products/${productToEdit._id}` : 'http://localhost:5000/api/products';
    const method = productToEdit ? 'PATCH' : 'POST';

    // Send request to backend
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    // Clear form and trigger appropriate callbacks on success
    if (response.ok) {
      setName('');
      setDescription('');
      setPrice('');
      onNewProduct(); // Callback to refresh the product list
      if (onProductEdited) {
        onProductEdited(); // Additional callback for post-edit actions
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 mb-4 space-y-4">
      <h2 className="text-lg font-semibold mb-4">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
      
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      {/* Price Field */}
      <div>
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($):</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {productToEdit ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;