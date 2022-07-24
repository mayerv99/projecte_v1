import axios from "axios";

export const getPrimaryUsers = async (selectedEnterprise) => {
  const res = await axios
    .get(`http://localhost:8080/usuario-primario/${selectedEnterprise}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return res;
};

export const createPrimaryUser = async (data) => {
  const primaryUser = await axios
    .post("http://localhost:8080/usuario-primario", data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return primaryUser;
};
