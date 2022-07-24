import axios from "axios";

export const checkIfUserExists = async (userId) => {
  const user = await axios
    .get(`http://localhost:8080/usuario/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return user;
};

export const createNewUser = async (data) => {
  const newUser = await axios
    .post("http://localhost:8080/usuario", data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return newUser;
};
