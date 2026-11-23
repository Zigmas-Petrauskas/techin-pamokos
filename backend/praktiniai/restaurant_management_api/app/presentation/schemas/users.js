import ajv from "../../core/ajv.js";

// Vartotojo request body validacijos schema
const userBodySchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      nonEmpty: true,
      format: "email",
      errorMessage: {
        type: "Email must be a string",
        nonEmpty: "Email cannot be empty",
        format: "Invalid email format",
      },
    },
    password: {
      type: "string",
      nonEmpty: true,
      strongPassword: true,
      errorMessage: {
        type: "Password must be a string",
        nonEmpty: "Password cannot be empty",
        strongPassword: "Password is not strong enough",
      },
    },
    // Tikriname, ar pakartotas slaptažodis sutampa
    repeatPassword: {
      type: "string",
      const: { $data: "1/password" },
      errorMessage: {
        type: "Repeat password must be a string",
        const: "Passwords do not match",
      },
    },
  },
  required: ["email", "password", "repeatPassword"],
  additionalProperties: false,
  errorMessage: {
    required: {
      email: "Email is required",
      password: "Password is required",
      repeatPassword: "Repeat password is required",
    },
    additionalProperties: "Additional properties are not allowed",
  },
};

// Atnaujinant vartotoją slaptažodis nėra privalomas
const updateUserBodySchema = {
  ...userBodySchema,
  required: ["email"],
  allOf: [
    {
      if: {
        required: ["password"],
      },
      then: {
        required: ["repeatPassword"],
        errorMessage: {
          required: {
            repeatPassword: "Repeat password is required",
          },
        },
      },
    },
  ],
  errorMessage: {
    required: {
      email: "Email is required",
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
export const validateUpdateUserBody = ajv.compile(updateUserBodySchema);
export const validateUserParams = ajv.compile(userParamsSchema);
