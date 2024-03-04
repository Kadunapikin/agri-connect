import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

// Sample product data
const sampleProducts = [
  { id: 1, name: 'Apples', description: 'Fresh apples from the farm', price: 2.99 },
  { id: 2, name: 'Oranges', description: 'Juicy oranges', price: 3.49 },
  // Add more products as needed
];

const Marketplace = () => {
  const [products] = useState(sampleProducts);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
