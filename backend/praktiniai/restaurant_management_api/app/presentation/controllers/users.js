import {
  createUser as createUserService,
  deleteUser as deleteUserService,
  getUserById as getUserByIdService,
  getUsers as getUsersService,
  updateUser as updateUserService,
} from "../../application/services/users.js";

import { validateUserBody, validateUserParams } from "../schemas/users.js";

// Sukuriame klaidą pagal pirmą AJV validacijos rezultatą
const createValidationError = (errors) => {
  const error = new Error(errors[0].message);
  error.status = 400;

  return error;
};

// Gauname visus vartotojus
export const getUsers = async (req, res) => {
  const users = await getUsersService();

  res.json(users);
};

// Gauname vieną vartotoją pagal ID
export const getUserById = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateUserParams(req.params)) {
    return next(createValidationError(validateUserParams.errors));
  }

  const { id } = req.params;

  const user = await getUserByIdService(id);

  // Jei vartotojas pagal ID nerastas, grąžiname 404
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// Sukuriame naują vartotoją
export const createUser = async (req, res, next) => {
  // Tikriname request body pagal AJV schemą
  if (!validateUserBody(req.body)) {
    return next(createValidationError(validateUserBody.errors));
  }

  try {
    const user = await createUserService(req.body);

    res.status(201).json(user);
  } catch (err) {
    // Pakeista: atskirai apdorojame jau naudojamą el. pašto adresą,
    // kad el. pašto konfliktas nebūtų laikomas bendra serverio klaida.
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return res.status(err.status).json({
        message: err.message,
      });
    }

    return next(err);
  }
};

// Atnaujiname vartotoją pagal ID
export const updateUser = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateUserParams(req.params)) {
    return next(createValidationError(validateUserParams.errors));
  }

  // Tikriname request body pagal AJV schemą
  if (!validateUserBody(req.body)) {
    return next(createValidationError(validateUserBody.errors));
  }

  const { id } = req.params;

  try {
    const user = await updateUserService(id, req.body);

    // Pakeista: null iš service dabar reiškia tik tai,
    // kad vartotojas su tokiu ID neegzistuoja.
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    // Pakeista: jei el. paštą jau naudoja kitas vartotojas,
    // grąžiname atskirą konflikto atsakymą.
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return res.status(err.status).json({
        message: err.message,
      });
    }

    return next(err);
  }
};

// Pašaliname vartotoją pagal ID
export const deleteUser = async (req, res, next) => {
  // Tikriname route parametrus pagal AJV schemą
  if (!validateUserParams(req.params)) {
    return next(createValidationError(validateUserParams.errors));
  }

  const { id } = req.params;

  const user = await deleteUserService(id);

  // Jei trinamas vartotojas neegzistuoja, grąžiname 404
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
