import React, { useContext, useEffect } from "react";

import { Wrapper, Title, ListContainer, ListItem } from "./styled";

import { baseContext } from "../../../Context/CompanyContext";

function EnterprisesList({ setFormVisibility }) {
  const {
    fecthEnterprises,
    enterprisesList,
    setSelectedEnterprise,
    selectedEnterprise,
  } = useContext(baseContext);

  useEffect(() => {
    getEnterprises();
  }, []);

  useEffect(() => {
    console.log(selectedEnterprise);
  }, [selectedEnterprise]);

  const handleIsSelected = (item) => {
    if (item.cod_empreendimento === selectedEnterprise) {
      return true;
    }
    return false;
  };

  const getEnterprises = async () => {
    await fecthEnterprises();
  };
  return (
    <Wrapper>
      <Title>
        <h2>Empreendimentos</h2>
        <button onClick={() => setFormVisibility(1)}>&#43;</button>
      </Title>
      <ListContainer>
        {enterprisesList.map((enterprise) => (
          <ListItem
            onClick={() => setSelectedEnterprise(enterprise.cod_empreendimento)}
            isSelected={handleIsSelected(enterprise)}
          >
            {enterprise.cod_empreendimento} -{" "}
            {enterprise.emp_nm_empreeendimento}
          </ListItem>
        ))}
      </ListContainer>
    </Wrapper>
  );
}

export default EnterprisesList;
