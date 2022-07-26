import axios from "axios";

export const getInterferences = async (enterpriseId) => {
  const interferences = await axios
    .get(`http://localhost:8080/interferencia/lista/${enterpriseId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return interferences;
};

export const createInterference = async (data) => {
  const newInterference = await axios
    .post("http://localhost:8080/interferencia", data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return newInterference;
};

export const editInterference = async (data) => {
  const newData = await axios
    .put("http://localhost:8080/interferencia", data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return newData;
};
