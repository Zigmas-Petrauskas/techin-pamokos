import jwt from "jsonwebtoken";
import config from "../../core/config.js";
import argon2 from "argon2";

// Sukuriame autentifikavimo service ir priklausomybes gauname per DI
export const createAuthenticationService = (usersRepository) => {
  // Prisijungiame naudodami el. paštą ir slaptažodį
  const login = async (email, password) => {
    const user = await usersRepository.findByEmail(email);

    // Jei vartotojas neegzistuoja, autentifikavimas nepavyksta
    if (!user) {
      return null;
    }

    // Patikriname slaptažodį pagal duomenų bazėje saugomą Argon2id hashą
    const isPasswordValid = await argon2.verify(user.password_hash, password);

    // Jei slaptažodis neteisingas, autentifikavimas nepavyksta
    if (!isPasswordValid) {
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

    // Slaptažodžio ir jo hash negrąžiname į controller
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
