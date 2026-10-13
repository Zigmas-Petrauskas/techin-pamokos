import './style.css';
import fetchMovies from './movies.js';
import { renderMovies } from './movieCards.js';
import { getFavorites, toggleFavorite } from './favorites.js';
import { calculateStatistics } from './statistics.js';

// Pagrindinis programos konteineris.
const app = document.querySelector('#app');

let allMovies = [];

app.innerHTML = `
  <main class="movies">
    <header class="movies-header">
      <h1>Filmų katalogas</h1>
      <p>Ieškokite filmų ir susikurkite mėgstamų filmų sąrašą.</p>
    </header>

    <section class="movies-content">
      <h2>Filmų sąrašas</h2>

      <div class="movies-filters">
        <input
          type="search"
          id="movie-search"
          placeholder="Ieškoti filmo..."
          aria-label="Ieškoti filmo pagal pavadinimą"
        />

        <select id="genre-filter" aria-label="Filtruoti pagal žanrą">
          <option value="">Visi žanrai</option>
        </select>

        <select id="sort-filter" aria-label="Rikiuoti filmus">
          <option value="">Numatytoji tvarka</option>
          <option value="title">Pagal pavadinimą (A–Z)</option>
          <option value="year">Pagal metus (naujausi)</option>
          <option value="rating">Pagal įvertinimą (aukščiausi)</option>
        </select>
      </div>

      <div class="movies-statistics" aria-live="polite">
        <div class="stat-card">
          <span class="stat-label">Rodoma filmų</span>
          <strong id="total-movies">0</strong>
        </div>

        <div class="stat-card">
          <span class="stat-label">Vidutinis įvertinimas</span>
          <strong id="average-rating">Nėra</strong>
        </div>

        <div class="stat-card">
          <span class="stat-label">Mėgstami filmai</span>
          <strong id="favorite-count">0</strong>
        </div>
      </div>

      <div id="movies-list" class="movies-list"></div>
    </section>
  </main>
`;

const moviesList = document.querySelector('#movies-list');
const searchInput = document.querySelector('#movie-search');
const genreFilter = document.querySelector('#genre-filter');
const sortFilter = document.querySelector('#sort-filter');

const totalMoviesElement = document.querySelector('#total-movies');
const averageRatingElement = document.querySelector('#average-rating');
const favoriteCountElement = document.querySelector('#favorite-count');

// Atnaujiname statistikos rodiklius.
const updateStatistics = (movies) => {
  const favorites = getFavorites();

  const { totalMovies, averageRating, favoriteCount } = calculateStatistics(movies, favorites);

  totalMoviesElement.textContent = totalMovies;
  averageRatingElement.textContent = averageRating;
  favoriteCountElement.textContent = favoriteCount;
};

// Atvaizduojame filmus ir atnaujiname statistiką.
const displayMovies = (movies) => {
  updateStatistics(movies);

  if (movies.length === 0) {
    moviesList.textContent = 'Filmų nerasta.';
    return;
  }

  moviesList.innerHTML = renderMovies(movies);
};

// Sugeneruojame unikalius filmų žanrus.
const displayGenres = (movies) => {
  const genres = [...new Set(movies.map(({ genre }) => genre))];

  genres.sort((a, b) => a.localeCompare(b));

  genres.forEach((genre) => {
    const option = document.createElement('option');

    option.value = genre;
    option.textContent = genre;

    genreFilter.appendChild(option);
  });
};

// Rikiuojame filmus pagal pasirinktą kriterijų.
const sortMovies = (movies, sortBy) => {
  const sortedMovies = [...movies];

  switch (sortBy) {
    case 'title':
      return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));

    case 'year':
      return sortedMovies.sort((a, b) => b.year - a.year);

    case 'rating':
      return sortedMovies.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    default:
      return sortedMovies;
  }
};

// Filtruojame ir rikiuojame filmus.
const filterMovies = () => {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreFilter.value;
  const selectedSort = sortFilter.value;

  const filteredMovies = allMovies.filter(({ title, genre }) => {
    const matchesSearch = title.toLowerCase().includes(searchText);
    const matchesGenre = !selectedGenre || genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const sortedMovies = sortMovies(filteredMovies, selectedSort);

  displayMovies(sortedMovies);
};

// Pridedame filmą prie mėgstamų arba pašaliname iš jų.
const handleFavoriteClick = (event) => {
  const button = event.target.closest('.favorite-btn');

  if (!button || !moviesList.contains(button)) {
    return;
  }

  const movieId = Number(button.dataset.id);
  const favorites = getFavorites();

  toggleFavorite(movieId, favorites);

  // Atnaujiname korteles ir statistiką, išlaikydami filtrus.
  filterMovies();
};

// Įkeliame filmus iš JSON failo.
const loadMovies = async () => {
  moviesList.textContent = 'Kraunama...';

  try {
    allMovies = await fetchMovies();

    displayGenres(allMovies);
    filterMovies();
  } catch (error) {
    moviesList.textContent = 'Nepavyko įkelti filmų. Bandykite dar kartą.';
    console.error(error);
  }
};

// Registruojame įvykių klausytojus.
searchInput.addEventListener('input', filterMovies);
genreFilter.addEventListener('change', filterMovies);
sortFilter.addEventListener('change', filterMovies);
moviesList.addEventListener('click', handleFavoriteClick);

loadMovies();
