"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '../../../types';
import ProductList from '../../../components/ProductList';

const ProductPage: React.FC = () => {
  
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      fetch('/products.json')
        .then((response) => response.json())
        .then((data: Product[]) => {
          const foundProduct = data.find((item) => item.slug === slug);
          setProduct(foundProduct || null);
        });
    }
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px' }} />
      <p>{product.description}</p>
      <ProductList />
    </div>
  );
};

export default ProductPage;
