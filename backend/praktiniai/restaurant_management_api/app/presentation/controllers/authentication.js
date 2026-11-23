import config from "../../core/config.js";
import { validateLoginBody } from "../schemas/authentication.js";

// Sukuriame autentifikavimo controller ir service gauname per DI
export const createAuthenticationController = (authenticationService) => {
  // Prisijungiame naudodami el. paštą ir slaptažodį
  const login = async (req, res, next) => {
    // Tikriname prisijungimo duomenis pagal AJV schemą
    if (!validateLoginBody(req.body)) {
      const error = new Error(validateLoginBody.errors[0].message);
      error.status = 400;

      return next(error);
    }

    const { email, password } = req.body;

    const result = await authenticationService.login(email, password);

    // Jei vartotojas neegzistuoja arba slaptažodis neteisingas,
    // abiem atvejais grąžiname tą patį 401 atsakymą.
    if (!result) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Išsaugome JWT cookie pavadinimu "token"
    // Cookie galioja vieną valandą
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: config.environment === "production",
    });

    // Grąžiname tik vartotojo informaciją be slaptažodžio ir tokeno
    res.json(result.user);
  };

  return {
    login,
  };
};
