import {
  createMenuItem as createMenuItemService,
  deleteMenuItem as deleteMenuItemService,
  getMenuItemById as getMenuItemByIdService,
  getMenuItems as getMenuItemsService,
  updateMenuItem as updateMenuItemService,
} from "../../application/services/menus.js";

import {
  validateMenuBody,
  validateMenuParams,
  validateMenuQuery,
} from "../schemas/menus.js";

// Sukuriame klaidą pagal pirmą AJV validacijos rezultatą
const createValidationError = (errors) => {
  const error = new Error(errors[0].message);
  error.status = 400;

  return error;
};

// Gauname meniu elementus pagal perduotus query parametrus
export const getMenuItems = async (req, res, next) => {
  // Tikriname query parametrus pagal AJV schemą
  if (!validateMenuQuery(req.query)) {
    return next(createValidationError(validateMenuQuery.errors));
  }

  const { category, available, search, sort, order, limit, offset } = req.query;

  const filters = {
    category,
    available,
    search,
    sort,
    order,
    limit,
    offset,
  };

  const menuItems = await getMenuItemsService(filters);

  res.json(menuItems);
};

// Gauname vieną meniu elementą pagal ID
export const getMenuItemById = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateMenuParams(req.params)) {
    return next(createValidationError(validateMenuParams.errors));
  }

  const { id } = req.params;

  const menuItem = await getMenuItemByIdService(id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};

// Sukuriame naują meniu elementą
export const createMenuItem = async (req, res, next) => {
  // Tikriname request body pagal AJV schemą
  if (!validateMenuBody(req.body)) {
    return next(createValidationError(validateMenuBody.errors));
  }

  try {
    const menuItem = await createMenuItemService(req.body);

    res.status(201).json(menuItem);
  } catch (err) {
    if (err.code === "INVALID_CATEGORY" || err.code === "INVALID_PRICE") {
      return res.status(err.status).json({
        error: {
          code: err.code,
          message: err.message,
        },
      });
    }

    return next(err);
  }
};

// Atnaujiname meniu elementą pagal ID
export const updateMenuItem = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateMenuParams(req.params)) {
    return next(createValidationError(validateMenuParams.errors));
  }

  // Tikriname request body pagal AJV schemą
  if (!validateMenuBody(req.body)) {
    return next(createValidationError(validateMenuBody.errors));
  }

  const { id } = req.params;

  const menuItem = await updateMenuItemService(id, req.body);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};

// Pašaliname meniu elementą pagal ID
export const deleteMenuItem = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateMenuParams(req.params)) {
    return next(createValidationError(validateMenuParams.errors));
  }

  const { id } = req.params;

  const menuItem = await deleteMenuItemService(id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};
