import {
  create,
  findAll,
  findById,
  remove,
  update,
} from "../../infrastructure/database/repositories/categories.js";

// Gauname visas kategorijas
export const getCategories = async () => {
  return await findAll();
};

// Gauname vieną kategoriją pagal ID
export const getCategoryById = async (id) => {
  return await findById(id);
};

// Sukuriame naują kategoriją
export const createCategory = async (category) => {
  return await create(category.name);
};

// Atnaujiname kategoriją pagal ID
export const updateCategory = async (id, category) => {
  return await update(id, category.name);
};

// Pašaliname kategoriją pagal ID
export const deleteCategory = async (id) => {
  return await remove(id);
};
