// Užregistruojame slaptažodžio sudėtingumo validaciją
export const registerStrongPassword = (ajv) => {
  ajv.addKeyword({
    keyword: "strongPassword",
    type: "string",
    schemaType: "boolean",

    validate: (schema, password) => {
      if (!schema) {
        return true;
      }

      // Tikriname slaptažodžio sudėtingumo reikalavimus
      return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
      );
    },
  });
};
