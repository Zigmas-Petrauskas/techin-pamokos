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

    // Išsaugome sugeneruotą tokeną cookie pavadinimu "token",
    // kad kitų užklausų metu authenticate middleware galėtų jį perskaityti.
    res.cookie("token", result.token, {
      httpOnly: true,
    });

    // Grąžiname tik vartotojo informaciją be slaptažodžio ir tokeno.
    res.json(result.user);
  };

  return {
    login,
  };
};
