import config from "../../core/config.js";

// Sukuriame autentifikavimo controller ir service gauname per DI
export const createAuthenticationController = (authenticationService) => {
  // Prisijungiame naudodami el. paštą ir slaptažodį
  const login = async (req, res) => {
    const { email, password } = req.body;

    const result = await authenticationService.login(email, password);

    // Jei vartotojas neegzistuoja arba slaptažodis neteisingas,
    // abiem atvejais grąžiname tą patį 401 atsakymą.
    if (!result) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Išsaugome jwt cookie pavadinimu "token",
    // cookie galioja 1h.
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: config.environment === "production",
    });

    // Grąžiname tik vartotojo informaciją be slaptažodžio ir tokeno.
    res.json(result.user);
  };

  return {
    login,
  };
};
