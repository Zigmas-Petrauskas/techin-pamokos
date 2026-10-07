import { randomUUID } from "node:crypto";

// Sukuriame autentifikavimo service ir priklausomybes gauname per DI
export const createAuthenticationService = (usersRepository) => {
  // Laikinai saugome autentifikavimo tokenus aplikacijos atmintyje
  const tokens = new Map();

  // Prisijungiame naudodami el. paštą ir slaptažodį
  const login = async (email, password) => {
    const user = await usersRepository.findByEmail(email);

    // Abiem neteisingo prisijungimo atvejais grąžiname tą patį rezultatą
    if (!user || user.password !== password) {
      return null;
    }

    // Sugeneruojame laikiną unikalų autentifikavimo tokeną
    const token = randomUUID();

    // Tokeną susiejame su prisijungusio vartotojo ID
    tokens.set(token, user.id);

    // Slaptažodžio negrąžiname į controller
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  };

  // Pagal tokeną nustatome prisijungusį vartotoją
  const authenticate = async (token) => {
    const userId = tokens.get(token);

    if (!userId) {
      return null;
    }

    const user = await usersRepository.findById(userId);

    if (!user) {
      return null;
    }

    return user;
  };

  return {
    login,
    authenticate,
  };
};
