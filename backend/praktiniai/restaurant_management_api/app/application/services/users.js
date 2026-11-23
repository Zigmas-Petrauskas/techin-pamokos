import argon2 from "argon2";
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

  // sugeneruojamas slaptažodžio hash
  const passwordHash = await argon2.hash(user.password, {
    type: argon2.argon2id,
  });

  return await create({
    ...user,
    password: undefined,
    password_hash: passwordHash,
  });
};

// Atnaujiname vartotoją
export const updateUser = async (id, user) => {
  //pirmiausia tikriname, ar vartotojas egzistuoja,
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

  const updateUser = { email: user.email };

  // jei pateiktas naujas slaptažodis, sugeneruojamas naujas hash
  if (user.password !== undefined) {
    updateUser.password_hash = await argon2.hash(user.password, {
      type: argon2.argon2id,
    });
  }

  // Repository perduodame hashą, išsaugodami ankstesnį, jeigu slaptažodis nebuvo keičiamas
  return await update(id, updateUser);
};

// Pašaliname vartotoją
export const deleteUser = async (id) => {
  return await remove(id);
};
