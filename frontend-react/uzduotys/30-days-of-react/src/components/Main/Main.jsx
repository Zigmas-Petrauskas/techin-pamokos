import TechList from '../TechList/TechList.jsx';
import UserCard from '../UserCard/UserCard.jsx';

// Pagrindinio turinio komponentas.
function Main() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-12 py-5">
      <TechList />
      <UserCard />
    </main>
  );
}

export default Main;
