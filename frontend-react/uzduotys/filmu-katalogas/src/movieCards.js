import { getFavorites } from './favorites.js';

// Sugeneruojame filmų korteles pagal mėgstamų filmų sąrašą.
export const renderMovies = (movies) => {
  const favorites = getFavorites();

  return movies
    .map(({ id, title, year, genre, rating }) => {
      const isFavorite = favorites.includes(id);

      return `
        <article class="movie-card" data-id="${id}">
          <h3 class="movie-title">${title}</h3>

          <p>Metai: ${year}</p>
          <p>Žanras: ${genre}</p>
          <p>Įvertinimas: ${rating ?? 'Nėra'}</p>

          <button
            class="favorite-btn"
            type="button"
            data-id="${id}"
            aria-label="${isFavorite ? 'Pašalinti iš mėgstamų' : 'Pridėti prie mėgstamų'}"
            aria-pressed="${isFavorite}"
          >
            ${isFavorite ? '★' : '☆'}
          </button>
        </article>
      `;
    })
    .join('');
};
