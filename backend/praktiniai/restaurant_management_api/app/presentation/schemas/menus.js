import ajv from "../../core/ajv.js";

// Meniu elemento request body validacijos schema
const menuBodySchema = {
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
    categoryId: {
      type: "number",
      errorMessage: {
        type: "Category ID must be a number",
      },
    },
    price: {
      type: "number",
      errorMessage: {
        type: "Price must be a number",
      },
    },
    available: {
      type: "boolean",
      errorMessage: {
        type: "Available must be a boolean",
      },
    },
  },
  required: ["name", "categoryId", "price", "available"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Name is required",
      categoryId: "Category ID is required",
      price: "Price is required",
      available: "Available is required",
    },
    additionalProperties: "Additional properties are not allowed",
  },
};

// Meniu route parametro ID validacijos schema
const menuParamsSchema = {
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

// Meniu query parametrų validacijos schema
const menuQuerySchema = {
  type: "object",
  properties: {
    category: {
      type: "string",
    },
    available: {
      type: "string",
      pattern: "^(true|false)$",
      errorMessage: {
        pattern: "Available must be true or false",
      },
    },
    search: {
      type: "string",
    },
    sort: {
      type: "string",
      pattern: "^(name|price)$",
      errorMessage: {
        pattern: "Sort must be name or price",
      },
    },
    order: {
      type: "string",
      pattern: "^(asc|desc)$",
      errorMessage: {
        pattern: "Order must be asc or desc",
      },
    },
    limit: {
      type: "string",
      pattern: "^[0-9]+$",
      errorMessage: {
        pattern: "Limit must be a number",
      },
    },
    offset: {
      type: "string",
      pattern: "^[0-9]+$",
      errorMessage: {
        pattern: "Offset must be a number",
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    additionalProperties: "Additional query parameters are not allowed",
  },
};

// Schemas sukompiliuojame vieną kartą
export const validateMenuBody = ajv.compile(menuBodySchema);
export const validateMenuParams = ajv.compile(menuParamsSchema);
export const validateMenuQuery = ajv.compile(menuQuerySchema);
