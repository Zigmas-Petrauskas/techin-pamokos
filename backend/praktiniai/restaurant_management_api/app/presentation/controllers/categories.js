import {
  createCategory as createCategoryService,
  deleteCategory as deleteCategoryService,
  getCategories as getCategoriesService,
  getCategoryById as getCategoryByIdService,
  updateCategory as updateCategoryService,
} from "../../application/services/categories.js";

import {
  validateCategoryBody,
  validateCategoryParams,
} from "../schemas/categories.js";

// Sukuriame klaidą pagal pirmą AJV validacijos rezultatą
const createValidationError = (errors) => {
  const error = new Error(errors[0].message);
  error.status = 400;

  return error;
};

// Gauname visas kategorijas
export const getCategories = async (req, res) => {
  const categories = await getCategoriesService();

  res.json(categories);
};

// Gauname vieną kategoriją pagal ID
export const getCategoryById = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateCategoryParams(req.params)) {
    return next(createValidationError(validateCategoryParams.errors));
  }

  const { id } = req.params;

  const category = await getCategoryByIdService(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

// Sukuriame naują kategoriją
export const createCategory = async (req, res, next) => {
  // Tikriname request body pagal AJV schemą
  if (!validateCategoryBody(req.body)) {
    return next(createValidationError(validateCategoryBody.errors));
  }

  const category = await createCategoryService(req.body);

  res.status(201).json(category);
};

// Atnaujiname kategoriją pagal ID
export const updateCategory = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateCategoryParams(req.params)) {
    return next(createValidationError(validateCategoryParams.errors));
  }

  // Tikriname request body pagal AJV schemą
  if (!validateCategoryBody(req.body)) {
    return next(createValidationError(validateCategoryBody.errors));
  }

  const { id } = req.params;

  const category = await updateCategoryService(id, req.body);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

// Pašaliname kategoriją pagal ID
export const deleteCategory = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateCategoryParams(req.params)) {
    return next(createValidationError(validateCategoryParams.errors));
  }

  const { id } = req.params;

  const category = await deleteCategoryService(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};
