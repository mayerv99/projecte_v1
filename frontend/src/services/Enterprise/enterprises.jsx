import axios from "axios";

export const getAllEnterprises = async () => {
  const res = await axios
    .get("http://localhost:8080/empreendimento")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return res;
};
