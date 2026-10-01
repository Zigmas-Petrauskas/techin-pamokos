import ajv from "../../core/ajv.js";

// Kategorijos request body validacijos schema
const categoryBodySchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      nonEmpty: true,
      errorMessage: {
        type: "Name must be a string",
        nonEmpty: "Name cannot be empty",
      },
    },
  },
  required: ["name"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Name is required",
    },
    additionalProperties: "Additional properties are not allowed",
  },
};

// Kategorijos route parametro ID validacijos schema
const categoryParamsSchema = {
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
export const validateCategoryBody = ajv.compile(categoryBodySchema);
export const validateCategoryParams = ajv.compile(categoryParamsSchema);
