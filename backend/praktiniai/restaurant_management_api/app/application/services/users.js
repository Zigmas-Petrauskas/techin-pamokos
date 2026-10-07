import {
  create,
  findAll,
  findByEmail,
  findById,
  remove,
  update,
} from "../../infrastructure/database/repositories/users.js";

// Gauname visus vartotojus
export const getUsers = async () => {
  return await findAll();
};

// Gauname vartotoją pagal ID
export const getUserById = async (id) => {
  return await findById(id);
};

// Sukuriame naują vartotoją
export const createUser = async (user) => {
  const existingUser = await findByEmail(user.email);

  // Pakeista: atskirai pažymime jau naudojamą el. paštą,
  // kad controller galėtų grąžinti tinkamą HTTP atsakymą.
  if (existingUser) {
    const error = new Error("Email already exists");
    error.code = "EMAIL_ALREADY_EXISTS";
    error.status = 409;

    throw error;
  }

  return await create(user);
};

// Atnaujiname vartotoją
export const updateUser = async (id, user) => {
  // Pakeista: pirmiausia tikriname, ar vartotojas egzistuoja,
  // kad neegzistuojantį vartotoją galėtume atskirti nuo el. pašto konflikto.
  const currentUser = await findById(id);

  if (!currentUser) {
    return null;
  }

  const existingUser = await findByEmail(user.email);

  // Pakeista: el. pašto konfliktas yra tik tada,
  // kai tas pats el. paštas priklauso kitam vartotojui.
  if (existingUser && existingUser.id !== Number(id)) {
    const error = new Error("Email already exists");
    error.code = "EMAIL_ALREADY_EXISTS";
    error.status = 409;

    throw error;
  }

  return await update(id, user);
};

// Pašaliname vartotoją
export const deleteUser = async (id) => {
  return await remove(id);
};
