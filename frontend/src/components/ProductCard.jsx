import React, { useState } from 'react';

// ProductCard component for displaying product details
const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <div className="mt-2">
        <span className="text-lg font-semibold">${product.price}</span>
      </div>
      <button
        onClick={() => onDelete(product._id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-4 rounded"
      >
        Delete
      </button>
      <button
        onClick={() => onEdit(product)} // Ensure this calls the passed `onEdit` function with the product
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 mt-4 ml-2 rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default ProductCard;
