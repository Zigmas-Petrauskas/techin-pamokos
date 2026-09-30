import {
  createMenuItem as createMenuItemService,
  deleteMenuItem as deleteMenuItemService,
  getMenuItemById as getMenuItemByIdService,
  getMenuItems as getMenuItemsService,
  updateMenuItem as updateMenuItemService,
} from "../../application/services/menus.js";

// Gauname meniu elementus pagal perduotus query parametrus
export const getMenuItems = async (req, res) => {
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
export const getMenuItemById = async (req, res) => {
  const { id } = req.params;

  const menuItem = await getMenuItemByIdService(id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};

// Sukuriame naują meniu elementą
export const createMenuItem = async (req, res) => {
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

    throw err;
  }
};

// Atnaujiname meniu elementą pagal ID
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;

  const menuItem = await updateMenuItemService(id, req.body);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};

// Pašaliname meniu elementą pagal ID
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  const menuItem = await deleteMenuItemService(id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
};
