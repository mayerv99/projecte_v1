import axios from "axios";

export const getSecondaryUser = async (enterpriseId) => {
  const secondaryUsers = await axios
    .get(`http://localhost:8080/usuario-secundario/${enterpriseId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return secondaryUsers;
};

export const createSecondaryUser = async (data) => {
  const newUser = await axios
    .post("http://localhost:8080/usuario-secundario", data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return newUser;
};
