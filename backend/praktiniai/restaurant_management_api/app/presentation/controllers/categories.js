import {
  createCategory as createCategoryService,
  deleteCategory as deleteCategoryService,
  getCategories as getCategoriesService,
  getCategoryById as getCategoryByIdService,
  updateCategory as updateCategoryService,
} from "../../application/services/categories.js";

// Gauname visas kategorijas
export const getCategories = async (req, res) => {
  const categories = await getCategoriesService();

  res.json(categories);
};

// Gauname vieną kategoriją pagal ID
export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  // Tikriname, ar ID yra skaičius
  if (Number.isNaN(Number(id))) {
    const error = new Error("ID must be a number");
    error.status = 400;

    return next(error);
  }

  const category = await getCategoryByIdService(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

// Sukuriame naują kategoriją
export const createCategory = async (req, res, next) => {
  const { name } = req.body;

  // Tikriname kategorijos pavadinimą
  if (typeof name !== "string" || name.trim() === "") {
    const error = new Error("Name is required");
    error.status = 400;

    return next(error);
  }

  const category = await createCategoryService(req.body);

  res.status(201).json(category);
};

// Atnaujiname kategoriją pagal ID
export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  // Tikriname, ar ID yra skaičius
  if (Number.isNaN(Number(id))) {
    const error = new Error("ID must be a number");
    error.status = 400;

    return next(error);
  }

  // Tikriname kategorijos pavadinimą
  if (typeof name !== "string" || name.trim() === "") {
    const error = new Error("Name is required");
    error.status = 400;

    return next(error);
  }

  const category = await updateCategoryService(id, req.body);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

// Pašaliname kategoriją pagal ID
export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  // Tikriname, ar ID yra skaičius
  if (Number.isNaN(Number(id))) {
    const error = new Error("ID must be a number");
    error.status = 400;

    return next(error);
  }

  const category = await deleteCategoryService(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};
