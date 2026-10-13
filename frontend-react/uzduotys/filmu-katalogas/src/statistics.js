// Apskaičiuojame rodomų filmų statistiką.
export const calculateStatistics = (movies, favorites) => {
  const totalMovies = movies.length;

  const ratedMovies = movies.filter(({ rating }) => rating != null);

  const ratingsSum = ratedMovies.reduce((sum, { rating }) => sum + rating, 0);

  const averageRating = ratedMovies.length ? (ratingsSum / ratedMovies.length).toFixed(1) : 'Nėra';

  const favoriteCount = favorites.length;

  return {
    totalMovies,
    averageRating,
    favoriteCount,
  };
};
