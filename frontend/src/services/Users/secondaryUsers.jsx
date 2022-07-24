import axios from "axios";

export const getSecondaryUser = async (enterpriseId) => {
  const secondaryUsers = await axios
    .get(`http://localhost:8080/usuario-secundario/${enterpriseId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return secondaryUsers;
};
