import axios from "axios";

// http://localhost:3000/users
const API_URL = import.meta.env.VITE_API_URL;

// paima visus duomenis
export const getAllData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// http://localhost:3000/users/2

// paima by id

export const getOne = async (id) => {
  //const responce = await axios.get(API_URL+"/"+id)
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
