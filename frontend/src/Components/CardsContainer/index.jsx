import React, { useContext, useEffect, useState } from "react";

import Card from "../Card";
import EnterpriseForm from "../Forms/EnterpriseForm";
import EnterprisesList from "../Lists/EnterprisesList";
import UsersAndInterferencesList from "../Lists/UsersAndInterferencesList";
import UserForm from "../Forms/UserForm";
import RelationModal from "../RelationModal";
import InterferenceForm from "../Forms/InterferenceForm";

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

  const [irrigacaoStatus, setIrrigacaoStatus] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [wasPresent, setWasPresent] = useState(false);

  const [isEditInterference, setIsEditInterference] = useState(false);

  const setFormValues = (values) => {
    setUserAndRelationFormData((prevsValues) => ({
      ...prevsValues,
      ...values,
    }));
  };

  const createRelationWithExistingUser = async (userId) => {
    const newPrimaryUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        relacao_usuario_proprietario: relacao_usuario_proprietario.value,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userId,
        possui_area_plantada: irrigacaoStatus,
        regularizado: isRegular,
        presente_no_local: wasPresent,
      },
    };

    setFormVisibility(0);
    if (userType === "primary") {
      await createPrimaryUser(newPrimaryUserData.relationData);
      return fetchUsers();
    }
    const newSecondaryUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        relacao_usuario_principal_secundario:
          relacao_usuario_principal_secundario.value,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userId,
        situacao_irrigacao: irrigacaoStatus,
        regularizado: isRegular,
        presente_no_local: wasPresent,
      },
    };
    await createSecondaryUser(newSecondaryUserData.relationData);
    return fetchUsers();
  };

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
          setFormValues={setFormValues}
          irrigacaoStatus={irrigacaoStatus}
          setIrrigacaoStatus={setIrrigacaoStatus}
          wasPresent={wasPresent}
          setWasPresent={setWasPresent}
          isRegular={isRegular}
          setIsRegular={setIsRegular}
        />
      )}
      {formVisibility === 3 && (
        <UserForm
          setFormVisibility={setFormVisibility}
          userAndRelationFormData={userAndRelationFormData}
          userToBeSelected={userToBeSelected}
          setUserToBeSelected={setUserToBeSelected}
          createRelationWithExistingUser={createRelationWithExistingUser}
          setFormValues={setFormValues}
        />
      )}
      {formVisibility === 4 && (
        <InterferenceForm
          setFormVisibility={setFormVisibility}
          isEdit={isEditInterference}
          setIsEdit={setIsEditInterference}
        />
      )}
      <Card>
        <EnterprisesList setFormVisibility={setFormVisibility} />
      </Card>
      <Card>
        <UsersAndInterferencesList
          setFormVisibility={setFormVisibility}
          setIsEditInterference={setIsEditInterference}
        />
      </Card>
    </Wrapper>
  );
}

export default CardsContainer;
