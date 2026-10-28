import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const deleteData = async (id, data) => {
  let response = await axios.delete(`${API_URL}/${id}`, data);
  return response.data;
};

export default deleteData;
