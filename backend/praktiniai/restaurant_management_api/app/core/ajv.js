import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { registerStrongPassword } from "./strong-password.js";

// Sukuriame bendrą AJV validatorių
const ajv = new Ajv({
  allErrors: true,
  $data: true,
});

// Prijungiame aiškių validacijos klaidų pranešimų palaikymą
ajvErrors(ajv);
// Prijungiame el. pašto ir kitų standartinių formatų validaciją
addFormats(ajv);
// Užregistruojame slaptažodžio sudėtingumo tikrinimą
registerStrongPassword(ajv);

// Tikriname, kad tekstas nebūtų tuščias arba sudarytas tik iš tarpų
ajv.addKeyword({
  keyword: "nonEmpty",
  type: "string",
  schemaType: "boolean",
  validate: (schema, data) => {
    if (!schema) {
      return true;
    }

    return data.trim().length > 0;
  },
});

export default ajv;
