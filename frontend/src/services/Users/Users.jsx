import axios from "axios";

export const checkIfUserExists = async (userId) => {
  const user = await axios
    .get(`http://localhost:8080/usuario/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return user;
};
