import { useState } from 'react';

// Kainos su nuolaida skaičiavimo komponentas.
const DerivedState = () => {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  // Galutinė kaina apskaičiuojama iš esamų reikšmių.
  const finalPrice = Number(price) * (1 - Number(discount) / 100);

  return (
    <section className="derived-state">
      <span className="exercise-number">Exercise 14</span>

      <h2>Derived State</h2>

      <div className="discount-form">
        <label htmlFor="product-price">Price (€)</label>
        <input
          id="product-price"
          type="number"
          min="0"
          placeholder="Enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label htmlFor="discount-percent">Discount (%)</label>
        <input
          id="discount-percent"
          type="number"
          min="0"
          max="100"
          placeholder="Enter discount"
          value={discount}
          onChange={(event) => setDiscount(event.target.value)}
        />
      </div>

      <div className="discount-result">
        <p>
          Original Price:
          <strong>{Number(price).toFixed(2)} €</strong>
        </p>

        <p>
          Discount:
          <strong>{Number(discount)}%</strong>
        </p>

        <p>
          Final Price:
          <strong>{finalPrice.toFixed(2)} €</strong>
        </p>
      </div>
    </section>
  );
};

export default DerivedState;
