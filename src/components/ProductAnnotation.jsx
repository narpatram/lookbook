import '../styles/ProductAnnotation.css';

const ProductAnnotation = ({ product, onClick }) => {
  return (
    <div
      className="product-dot"
      style={{
        left: `${product.x}%`,
        top: `${product.y}%`,
      }}
      onClick={onClick}
    >
      <div className="dot" />
    </div>
  );
};

export default ProductAnnotation; 