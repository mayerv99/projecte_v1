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

  const createRelationWithExistingUser = async (userId) => {
    const newUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userId,
      },
    };
    console.log("relationData: ", {
      relationData: {
        ...userAndRelationFormData.relationData,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userId,
      },
      userType,
    });
    setFormVisibility(0);
    if (userType === "primary") {
      await createPrimaryUser(newUserData.relationData);
      return fetchUsers();
    }
    await createSecondaryUser(newUserData.relationData);
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
