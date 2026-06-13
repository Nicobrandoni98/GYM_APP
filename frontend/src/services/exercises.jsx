import axios from "axios";

const baseUrl = "http://localhost:3001/api/exercises";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAllExercises = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const createExercise = (dia, ejercicio) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .post(`${baseUrl}/${dia}`, ejercicio, config)
    .then((response) => response.data);
};

export const deleteExercise = (id) => axios.delete(`${baseUrl}/${id}`);

export const updateExercise = (id, ejercicio) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .put(`${baseUrl}/${id}`, ejercicio, config)
    .then((res) => res.data);
};
