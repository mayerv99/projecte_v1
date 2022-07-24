import React, { useContext, useEffect } from "react";

import { Wrapper, Title } from "./styled";

import { baseContext } from "../../../Context/CompanyContext";

function EnterprisesList({ setFormVisibility }) {
  const { fecthEnterprises, enterprisesList } = useContext(baseContext);

  useEffect(() => {
    getEnterprises();
  }, []);

  const getEnterprises = async () => {
    await fecthEnterprises();
  };
  return (
    <Wrapper>
      <Title>
        <h2>Empreendimentos</h2>
        <button onClick={() => setFormVisibility(1)}>&#43;</button>
      </Title>
      {enterprisesList.map((enterprise) => (
        <div>{enterprise.cod_empreendimento}</div>
      ))}
    </Wrapper>
  );
}

export default EnterprisesList;
