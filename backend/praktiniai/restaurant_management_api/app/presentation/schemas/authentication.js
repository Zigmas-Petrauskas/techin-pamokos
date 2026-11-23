import ajv from "../../core/ajv.js";

// Prisijungimo duomenų validacijos schema
const loginBodySchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      nonEmpty: true,
      format: "email",
      errorMessage: {
        type: "Email must be a string",
        nonEmpty: "Email cannot empty",
        format: "Invalid email format",
      },
    },
    password: {
      type: "string",
      nonEmpty: true,
      errorMessage: {
        type: "Password must be a string",
        nonEmpty: "Password cannot empty",
      },
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    required: {
      email: "Email is required",
      password: "Password is required",
    },
    additionalProperties: "Additional properties are not allowed",
  },
};

// Sukompiliuojame prisijungimo validacijos schemą
export const validateLoginBody = ajv.compile(loginBodySchema);
