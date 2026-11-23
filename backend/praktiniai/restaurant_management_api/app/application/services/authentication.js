import jwt from "jsonwebtoken";
import config from "../../core/config.js";

// Sukuriame autentifikavimo service ir priklausomybes gauname per DI
export const createAuthenticationService = (usersRepository) => {
  // Prisijungiame naudodami el. paštą ir slaptažodį
  const login = async (email, password) => {
    const user = await usersRepository.findByEmail(email);

    // Abiem neteisingo prisijungimo atvejais grąžiname tą patį rezultatą
    if (!user || user.password !== password) {
      return null;
    }

    // Sugeneruojame JWT su vartotojo ID ir el. paštu
    // Tokenas galioja vieną valandą
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.auth.jwtSecret,
      {
        expiresIn: "1h",
      },
    );

    // Slaptažodžio negrąžiname į controller
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  };

  // Pagal JWT nustatome prisijungusį vartotoją
  const authenticate = async (token) => {
    try {
      // Patikriname JWT parašą ir galiojimo laiką
      const payload = jwt.verify(token, config.auth.jwtSecret);

      // Pagal JWT payload gauname vartotoją
      const user = await usersRepository.findById(payload.id);

      if (!user) {
        return null;
      }

      return user;
    } catch {
      // Jei JWT neteisingas arba pasibaigęs, autentifikavimas nepavyksta
      return null;
    }
  };

  return {
    login,
    authenticate,
  };
};
