import { useState } from 'react';

// Prekių sąrašas.
const products = [
  { id: 1, name: 'Laptop', price: 899 },
  { id: 2, name: 'Keyboard', price: 79 },
  { id: 3, name: 'Mouse', price: 35 },
];

// Prekių krepšelio komponentas.
const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  // Prekės pridėjimas į krepšelį.
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Apskaičiuojama bendra krepšelio kaina.
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <section className="shopping-cart">
      <span className="exercise-number">Exercise 13</span>

      <h2>Shopping Cart</h2>

      <div className="shopping-products">
        {products.map((product) => (
          <div className="shopping-product" key={product.id}>
            <div className="shopping-product-info">
              <span>{product.name}</span>
              <span>{product.price.toFixed(2)} €</span>
            </div>

            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>

        <p>
          Items: <strong>{cart.length}</strong>
        </p>

        <p>
          Total: <strong>{totalPrice.toFixed(2)} €</strong>
        </p>
      </div>
    </section>
  );
};

export default ShoppingCart;
