import {
  create,
  findAll,
  findById,
  remove,
  update,
} from "../../infrastructure/database/repositories/menus.js";

import { findByName as findCategoryByName } from "../../infrastructure/database/repositories/categories.js";

// Gauname visus meniu elementus
export const getMenuItems = async () => {
  return await findAll();
};

// Gauname vieną meniu elementą pagal ID
export const getMenuItemById = async (id) => {
  return await findById(id);
};

// Sukuriame naują meniu elementą
export const createMenuItem = async (menuItem) => {
  const category = await findCategoryByName(menuItem.category);

  return await create({
    name: menuItem.name,
    categoryId: category.id,
    price: menuItem.price,
    available: menuItem.available,
  });
};

// Atnaujiname meniu elementą pagal ID
export const updateMenuItem = async (id, menuItem) => {
  return await update(id, menuItem);
};

// Pašaliname meniu elementą pagal ID
export const deleteMenuItem = async (id) => {
  return await remove(id);
};
