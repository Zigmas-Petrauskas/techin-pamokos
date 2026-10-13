// Raktas, pagal kurį localStorage saugos mėgstamų filmų ID.
const STORAGE_KEY = 'favoriteMovies';

// Gauname išsaugotus mėgstamų filmų ID.
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);

    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Nepavyko nuskaityti mėgstamų filmų:', error);
    return [];
  }
};

// Išsaugome mėgstamų filmų ID naršyklėje.
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Nepavyko išsaugoti mėgstamų filmų:', error);
  }
};

// Pridedame filmą prie mėgstamų arba pašaliname iš jų.
export const toggleFavorite = (movieId, favorites) => {
  const updatedFavorites = favorites.includes(movieId)
    ? favorites.filter((id) => id !== movieId)
    : [...favorites, movieId];

  saveFavorites(updatedFavorites);

  return updatedFavorites;
};
