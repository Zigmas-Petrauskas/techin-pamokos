import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';

// Pagrindinis puslapio komponentas.
function App() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col bg-white text-gray-900">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
