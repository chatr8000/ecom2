"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.slug}`} passHref>
            <div>
              <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px' }} />
              <h3>{product.name}</h3>
            </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
