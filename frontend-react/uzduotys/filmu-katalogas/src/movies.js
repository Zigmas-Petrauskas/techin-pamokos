// Asinchroninė funkcija filmų duomenims įkelti.
const fetchMovies = async () => {
  try {
    // Gauname filmų duomenis iš JSON failo.
    const response = await fetch('/movies.json');

    if (!response.ok) {
      throw new Error('Nepavyko įkelti filmų duomenų.');
    }

    // JSON atsakymą paverčiame JavaScript duomenimis.
    const movies = await response.json();

    // Pridedame 2 sekundžių uždelsimą, kad matytųsi „Kraunama...“.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return movies;
  } catch (error) {
    console.error('Filmų įkėlimo klaida:', error);
    throw error;
  }
};

export default fetchMovies;
