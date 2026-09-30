import {
  create,
  findAll,
  findById,
  remove,
  update,
} from "../../infrastructure/database/repositories/menus.js";

// Gauname meniu elementus pagal perduotus filtrus
export const getMenuItems = async (filters) => {
  return await findAll(filters);
};

// Gauname vieną meniu elementą pagal ID
export const getMenuItemById = async (id) => {
  return await findById(id);
};

// Sukuriame naują meniu elementą
export const createMenuItem = async (menuItem) => {
  try {
    return await create({
      name: menuItem.name,
      categoryId: menuItem.categoryId,
      price: menuItem.price,
      available: menuItem.available,
    });
  } catch (err) {
    // Apdorojame neegzistuojančios kategorijos klaidą
    if (err.code === "23503") {
      const error = new Error("Category does not exist.");
      error.code = "INVALID_CATEGORY";
      error.status = 400;

      throw error;
    }

    // Apdorojame netinkamos kainos CHECK constraint klaidą
    if (err.code === "23514") {
      const error = new Error("Price must be greater than zero.");
      error.code = "INVALID_PRICE";
      error.status = 400;

      throw error;
    }

    throw err;
  }
};
// Atnaujiname meniu elementą pagal ID
export const updateMenuItem = async (id, menuItem) => {
  return await update(id, menuItem);
};

// Pašaliname meniu elementą pagal ID
export const deleteMenuItem = async (id) => {
  return await remove(id);
};
