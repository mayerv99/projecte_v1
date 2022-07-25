import React, { useContext, useEffect, useState } from "react";

import Card from "../Card";
import EnterpriseForm from "../Forms/EnterpriseForm";
import EnterprisesList from "../Lists/EnterprisesList";
import UsersAndInterferencesList from "../Lists/UsersAndInterferencesList";
import UserForm from "../Forms/UserForm";
import RelationModal from "../RelationModal";

import { Wrapper } from "./styled";
import { baseContext } from "../../Context/CompanyContext";

import { createPrimaryUser } from "../../services/Users/primaryUsers";
import { createSecondaryUser } from "../../services/Users/secondaryUsers";

function CardsContainer() {
  const [formVisibility, setFormVisibility] = useState(0);

  const { selectedEnterprise, fetchUsers } = useContext(baseContext);

  const [userAndRelationFormData, setUserAndRelationFormData] = useState({});
  const [userToBeSelected, setUserToBeSelected] = useState({});
  const [userType, setUserType] = useState("");
  const [relacao_usuario_proprietario, setRelacao_usuario_proprietario] =
    useState("");
  const [
    relacao_usuario_principal_secundario,
    setRelacao_usuario_principal_secundario,
  ] = useState();

  const createRelationWithExistingUser = async (userId) => {
    const newPrimaryUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        relacao_usuario_proprietario: relacao_usuario_proprietario.value,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userId,
      },
    };

    const newSecondaryUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        relacao_usuario_principal_secundario:
          relacao_usuario_principal_secundario.value,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userId,
      },
    };

    setFormVisibility(0);
    if (userType === "primary") {
      await createPrimaryUser(newPrimaryUserData.relationData);
      return fetchUsers();
    }
    await createSecondaryUser(newSecondaryUserData.relationData);
    return fetchUsers();
  };

  useEffect(() => {
    console.log(userAndRelationFormData);
  }, [userAndRelationFormData]);

  useEffect(() => {
    console.log("userToBeSelected: ", userToBeSelected);
  }, [userToBeSelected]);

  return (
    <Wrapper>
      {formVisibility === 1 && (
        <EnterpriseForm setFormVisibility={setFormVisibility} />
      )}
      {formVisibility === 2 && (
        <RelationModal
          setFormVisibility={setFormVisibility}
          setUserAndRelationFormData={setUserAndRelationFormData}
          userAndRelationFormData={userAndRelationFormData}
          userToBeSelected={userToBeSelected}
          setUserToBeSelected={setUserToBeSelected}
          setUserType={setUserType}
          userType={userType}
          relacao_usuario_proprietario={relacao_usuario_proprietario}
          setRelacao_usuario_proprietario={setRelacao_usuario_proprietario}
          relacao_usuario_principal_secundario={
            relacao_usuario_principal_secundario
          }
          setRelacao_usuario_principal_secundario={
            setRelacao_usuario_principal_secundario
          }
        />
      )}
      {formVisibility === 3 && (
        <UserForm
          setFormVisibility={setFormVisibility}
          userAndRelationFormData={userAndRelationFormData}
          userToBeSelected={userToBeSelected}
          setUserToBeSelected={setUserToBeSelected}
          createRelationWithExistingUser={createRelationWithExistingUser}
        />
      )}
      {/* {formVisibility === 3 && (
        <InterferenceForm setFormVisibility={setFormVisibility} />
      )} */}
      <Card>
        <EnterprisesList setFormVisibility={setFormVisibility} />
      </Card>
      <Card>
        <UsersAndInterferencesList setFormVisibility={setFormVisibility} />
      </Card>
    </Wrapper>
  );
}

export default CardsContainer;
