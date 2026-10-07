import ajv from "../../core/ajv.js";

// Vartotojo request body validacijos schema
const userBodySchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      nonEmpty: true,
      errorMessage: {
        type: "Email must be a string",
        nonEmpty: "Email cannot be empty",
      },
    },
    password: {
      type: "string",
      nonEmpty: true,
      errorMessage: {
        type: "Password must be a string",
        nonEmpty: "Password cannot be empty",
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

// Vartotojo route parametro ID validacijos schema
const userParamsSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "^[0-9]+$",
      errorMessage: {
        type: "ID must be a string",
        pattern: "ID must contain only numbers",
      },
    },
  },
  required: ["id"],
  additionalProperties: false,
  errorMessage: {
    required: {
      id: "ID is required",
    },
    additionalProperties: "Additional parameters are not allowed",
  },
};

// Schemas sukompiliuojame vieną kartą
export const validateUserBody = ajv.compile(userBodySchema);
export const validateUserParams = ajv.compile(userParamsSchema);
