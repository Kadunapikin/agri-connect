import React from 'react';

// ProductCard component for displaying product details
const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <div className="mt-2">
        <span className="text-lg font-semibold">${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
