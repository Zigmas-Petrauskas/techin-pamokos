import Product from './components/Product';
import './App.css';

const App = () => {
  return (
    <main className="products">
      <h1>Product Showcase</h1>
      <div className="products-list">
        <Product title="Laptop" price={899} onSale={true} />
        <Product title="Keyboard" price={79} onSale={false} />
        <Product title="Mouse" price={35} onSale={true} />
      </div>
    </main>
  );
};

export default App;
