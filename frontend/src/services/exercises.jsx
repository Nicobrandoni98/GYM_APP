import axios from "axios";

const baseUrl = "http://localhost:3001/api/exercises";

export const getAllExercises = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const createExercise = (dia, ejercicio) => {
  return axios
    .post(`${baseUrl}/${dia}`, ejercicio)
    .then((response) => response.data);
};

export const deleteExercise = (id) =>
  axios.delete(`${baseUrl}/${id}`);

export const updateExercise = (id, ejercicio) =>
  axios
    .put(`${baseUrl}/${id}`, ejercicio)
    .then(res => res.data);