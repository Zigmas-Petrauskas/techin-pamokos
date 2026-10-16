// Puslapio antraštės komponentas.
function Header() {
  return (
    <header className="w-full bg-[#61dafb] px-7 py-6">
      <div className="mx-auto w-full max-w-5xl px-12">
        <h1 className="mb-2 text-4xl font-light">Sveiki atvykę į „30 React dienų“</h1>

        <p className="text-sm">React mokymosi pradžia</p>
        <p className="text-xs">JavaScript biblioteka</p>
        <p className="text-xs">Zigmas Petrauskas</p>
        <p className="text-xs">2026 m. spalio 16 d.</p>
      </div>
    </header>
  );
}

export default Header;
