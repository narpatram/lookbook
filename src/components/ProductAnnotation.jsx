import '../styles/ProductAnnotation.css';

const ProductAnnotation = ({ product, onClick, isPaused }) => {
  return (
    <div
      className={`product-dot ${isPaused ? 'paused' : ''}`}
      style={{
        left: `${product.x}%`,
        top: `${product.y}%`,
      }}
      onClick={onClick}
    >
      <div className="dot" />
      {isPaused && <div className="product-label">{product.name}</div>}
    </div>
  );
};

export default ProductAnnotation; 