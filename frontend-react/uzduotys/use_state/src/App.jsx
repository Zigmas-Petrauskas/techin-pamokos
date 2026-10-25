import BasicCounter from './components/BasicCounter';
import Toggle from './components/Toggle';
import DynamicInput from './components/DynamicInput';
import ShowHideContent from './components/ShowHideContent';
import FormState from './components/FormState';
import MultipleCounters from './components/MultipleCounters';
import TodoList from './components/TodoList';
import LikeDislike from './components/LikeDislike';
import TabNavigation from './components/TabNavigation';
import DynamicBackground from './components/DynamicBackground';
import CounterWithLimits from './components/CounterWithLimits';
import Timer from './components/Timer';
import ShoppingCart from './components/ShoppingCart';
import DerivedState from './components/DerivedState';
import CounterWithHistory from './components/CounterWithHistory';

import './App.css';

// Pagrindinis programos komponentas.
const App = () => {
  return (
    <main className="app">
      <h1>React useState Exercises</h1>

      <div className="exercises-grid">
        <BasicCounter />
        <Toggle />
        <DynamicInput />

        <div className="exercises-stacked">
          <ShowHideContent />
          <MultipleCounters />
        </div>

        <FormState />

        <div className="exercises-stacked">
          <TodoList />
          <LikeDislike />
        </div>

        <div className="exercises-pair">
          <TabNavigation />
          <DynamicBackground />
        </div>

        <div className="exercises-pair">
          <CounterWithLimits />
          <Timer />
        </div>

        <ShoppingCart />
        <DerivedState />
        <CounterWithHistory />
      </div>
    </main>
  );
};

export default App;
