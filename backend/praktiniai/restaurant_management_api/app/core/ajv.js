import Ajv from "ajv";
import ajvErrors from "ajv-errors";

// Sukuriame bendrą AJV validatorių
const ajv = new Ajv({
  allErrors: true,
});

// Prijungiame aiškių validacijos klaidų pranešimų palaikymą
ajvErrors(ajv);

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
