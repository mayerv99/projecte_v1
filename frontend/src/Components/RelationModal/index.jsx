import React, { useContext, useEffect, useRef, useState } from "react";

import { ModalBackground, Wrapper } from "./styled";

import { baseContext } from "../../Context/CompanyContext";

import { getPrimaryUsers } from "../../services/Users/primaryUsers";
import { checkIfUserExists } from "../../services/Users/Users";

function RelationModal({ setFormVisibility }) {
  const { selectedEnterprise } = useContext(baseContext);

  const userRef = useRef(null);

  const [hasPrimaryUser, setHasPrimaryUser] = useState(false);
  const [userType, setUserType] = useState();
  const [step, setStep] = useState(1);

  const checkButtonDisabled = async () => {
    const primaryUsers = await getPrimaryUsers(selectedEnterprise);
    if (primaryUsers && primaryUsers.length > 0) {
      return setHasPrimaryUser(true);
    }
    return setHasPrimaryUser(false);
  };

  const openUserSearch = (userType) => {
    setStep(2);
    setUserType(userType);
  };

  const searchUser = async () => {
    const user = await checkIfUserExists(userRef.current.value);
    console.log(user);
  };

  useEffect(() => {
    checkButtonDisabled();
  }, []);

  return (
    <ModalBackground>
      <Wrapper>
        {step === 1 && (
          <>
            <h2>Selecione o tipo de usuário que deseja cadastrar:</h2>
            <div>
              {!hasPrimaryUser && (
                <button onClick={() => openUserSearch("primary")}>
                  Usuário principal
                </button>
              )}
              <button onClick={() => openUserSearch("secondary")}>
                Usuário secundário
              </button>
            </div>
            <span>
              Caso apareça apenas a opção de "Usuário secundário", o
              empreendimento ja possui um usuário principal
            </span>
          </>
        )}
        {step === 2 && (
          <>
            <input ref={userRef} />
            <button onClick={searchUser}>Buscar</button>
          </>
        )}
      </Wrapper>
    </ModalBackground>
  );
}

export default RelationModal;
