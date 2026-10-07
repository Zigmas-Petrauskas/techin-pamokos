// Sukuriame autentifikavimo middleware ir service gauname per DI
export const createAuthenticate = (authenticationService) => {
  // Tikriname, ar užklausą siunčia autentifikuotas vartotojas
  return async (req, res, next) => {
    // Tokeną gauname iš cookie pavadinimu "token"
    const token = req.cookies.token;

    // Jei tokeno nėra, užklausa nėra autentifikuota
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // Per authentication service patikriname tokeną ir gauname vartotoją
    const user = await authenticationService.authenticate(token);

    // Jei tokenas negalioja arba vartotojas nerastas,
    // apsaugotos užklausos vykdymą sustabdome.
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // Išsaugome autentifikuoto vartotojo informaciją req.user,
    // kad ją galėtų naudoti kiti middleware ar controlleriai.
    req.user = user;

    // Tokenas galioja, todėl tęsiame užklausos vykdymą.
    next();
  };
};
