import {
  createMenuItem as createMenuItemService,
  deleteMenuItem as deleteMenuItemService,
  getMenuItemById as getMenuItemByIdService,
  getMenuItems as getMenuItemsService,
  updateMenuItem as updateMenuItemService,
} from "../../application/services/menus.js";

// Gauname meniu elementus pagal perduotus query parametrus
export const getMenuItems = async (req, res, next) => {
  const { category, available, search, sort, order, limit, offset } = req.query;

  // Tikriname available reikšmę
  if (
    available !== undefined &&
    available !== "true" &&
    available !== "false"
  ) {
    const error = new Error("Available must be true or false");
    error.status = 400;

    return next(error);
  }

  // Tikriname rikiavimo lauką
  if (sort !== undefined && !["name", "price"].includes(sort)) {
    const error = new Error("Sort must be name or price");
    error.status = 400;

    return next(error);
  }

  // Tikriname rikiavimo kryptį
  if (order !== undefined && !["asc", "desc"].includes(order)) {
    const error = new Error("Order must be asc or desc");
    error.status = 400;

    return next(error);
  }

  // Tikriname limit reikšmę
  if (limit !== undefined && Number.isNaN(Number(limit))) {
    const error = new Error("Limit must be a number");
    error.status = 400;

    return next(error);
  }

  // Tikriname offset reikšmę
  if (offset !== undefined && Number.isNaN(Number(offset))) {
    const error = new Error("Offset must be a number");
    error.status = 400;

    return next(error);
  }

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
  const { id } = req.params;

  // Tikriname, ar ID yra skaičius
  if (Number.isNaN(Number(id))) {
    const error = new Error("ID must be a number");
    error.status = 400;

    return next(error);
  }

  const menuItem = await getMenuItemByIdService(id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};

// Sukuriame naują meniu elementą
export const createMenuItem = async (req, res, next) => {
  const { name, categoryId, price, available } = req.body;

  // Tikriname meniu elemento pavadinimą
  if (typeof name !== "string" || name.trim() === "") {
    const error = new Error("Name is required");
    error.status = 400;

    return next(error);
  }

  // Tikriname kategorijos ID
  if (typeof categoryId !== "number") {
    const error = new Error("Category ID must be a number");
    error.status = 400;

    return next(error);
  }

  // Tikriname kainą
  if (typeof price !== "number") {
    const error = new Error("Price must be a number");
    error.status = 400;

    return next(error);
  }

  // Tikriname prieinamumo reikšmę
  if (typeof available !== "boolean") {
    const error = new Error("Available must be a boolean");
    error.status = 400;

    return next(error);
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
  const { id } = req.params;
  const { name, categoryId, price, available } = req.body;

  // Tikriname, ar ID yra skaičius
  if (Number.isNaN(Number(id))) {
    const error = new Error("ID must be a number");
    error.status = 400;

    return next(error);
  }

  // Tikriname meniu elemento pavadinimą
  if (typeof name !== "string" || name.trim() === "") {
    const error = new Error("Name is required");
    error.status = 400;

    return next(error);
  }

  // Tikriname kategorijos ID
  if (typeof categoryId !== "number") {
    const error = new Error("Category ID must be a number");
    error.status = 400;

    return next(error);
  }

  // Tikriname kainą
  if (typeof price !== "number") {
    const error = new Error("Price must be a number");
    error.status = 400;

    return next(error);
  }

  // Tikriname prieinamumo reikšmę
  if (typeof available !== "boolean") {
    const error = new Error("Available must be a boolean");
    error.status = 400;

    return next(error);
  }

  const menuItem = await updateMenuItemService(id, req.body);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};

// Pašaliname meniu elementą pagal ID
export const deleteMenuItem = async (req, res, next) => {
  const { id } = req.params;

  // Tikriname, ar ID yra skaičius
  if (Number.isNaN(Number(id))) {
    const error = new Error("ID must be a number");
    error.status = 400;

    return next(error);
  }

  const menuItem = await deleteMenuItemService(id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};
