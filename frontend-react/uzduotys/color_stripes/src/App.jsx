import ColorStripe from './components/ColorStripe';
import { hexalColor } from './utils/colorGenerator';
import './App.css';

const colors = Array.from({ length: 5 }, () => hexalColor());

const App = () => {
  return (
    <main className="color-stripes">
      <h1>Random Color Stripes</h1>

      <div className="color-stripes-container">
        {colors.map((color, index) => (
          <ColorStripe key={index} color={color} />
        ))}
      </div>
    </main>
  );
};

export default App;
