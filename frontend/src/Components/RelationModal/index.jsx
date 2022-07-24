import React, { useContext, useEffect, useState } from "react";

import { ModalBackground, Wrapper } from "./styled";

import { baseContext } from "../../Context/CompanyContext";

import { getPrimaryUsers } from "../../services/Users/primaryUsers";

function RelationModal({ setFormVisibility }) {
  const { selectedEnterprise } = useContext(baseContext);

  const [hasPrimaryUser, setHasPrimaryUser] = useState(false);

  const checkButtonDisabled = async () => {
    const primaryUsers = await getPrimaryUsers("teste");
    if (primaryUsers && primaryUsers.length > 0) {
      return setHasPrimaryUser(true);
    }
    return setHasPrimaryUser(false);
  };

  useEffect(() => {
    checkButtonDisabled();
  }, []);

  return (
    <ModalBackground>
      <Wrapper>
        <h2>Selecione o tipo de usuário que deseja cadastrar:</h2>
        <div>
          {!hasPrimaryUser && <button>Usuario principal</button>}
          <button>Usuario secundário</button>
        </div>
        <span>
          Caso apareça apenas a opção de "Usuário secundário", o empreendimento
          ja possui um usuário principal
        </span>
      </Wrapper>
    </ModalBackground>
  );
}

export default RelationModal;
