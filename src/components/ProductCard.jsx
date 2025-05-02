import React from 'react';
import '../styles/Look.css';

const ProductCard = ({ product, folder, onShop, onClose }) => {
  return (
    <>
      <div className="product-card-backdrop" onClick={onClose} />
      <div className="product-card" onClick={e => e.stopPropagation()}>
        <div className="product-card-left">
          {product.thumbnail && (
            <img
              className="product-card-thumbnail"
              src={product.thumbnail.startsWith('http') ? product.thumbnail : `/looks/${folder}/${product.thumbnail}`}
              alt={product.name}
            />
          )}
          <span className="product-card-price">${product.price}</span>
        </div>
        <div className="product-card-details">
          <h3>{product.name}</h3>
          {product.description && (
            <p className="product-card-description">{product.description}</p>
          )}
          <button className="product-card-shop" onClick={onShop}>
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard; 