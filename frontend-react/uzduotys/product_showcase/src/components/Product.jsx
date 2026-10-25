const Product = ({ title, price, onSale }) => {
  return (
    <div className="product-card">
      <h2>{title}</h2>
      <p>Price: {price} €</p>
      {onSale && <span className="sale-label">SALE!</span>}
    </div>
  );
};

export default Product;
