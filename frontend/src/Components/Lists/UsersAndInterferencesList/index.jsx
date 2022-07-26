import React, { useContext, useEffect, useState } from "react";

import { baseContext } from "../../../Context/CompanyContext";
import { getPrimaryUsers } from "../../../services/Users/primaryUsers";
import { getSecondaryUser } from "../../../services/Users/secondaryUsers";
import { checkIfUserExists } from "../../../services/Users/Users";

import {
  Title,
  Wrapper,
  SliderBackground,
  SliderOption,
  Slider,
  ListContainer,
  ListItem,
} from "./styled";

function UsersAndInterferencesList({ setFormVisibility }) {
  const [selectedOption, setSelectedOption] = useState("user");
  const [enterpriseUsersData, setEnterpriseUsersData] = useState([]);
  const [enterpriseRelations, setEnterpriseRelations] = useState([]);

  const { interferencesList, fetchInterferences } = useContext(baseContext);

  const {
    selectedEnterprise,
    usersList,
    setUsersList,
    fetchUsers,
    enterpriseRelationsList,
  } = useContext(baseContext);

  const openUserForm = () => {
    setFormVisibility(2);
  };

  const openInterferenceForm = () => {
    setFormVisibility(4);
  };

  const getAllUsers = async () => {
    fetchUsers();
  };

  const handleData = async () => {
    if (selectedEnterprise) {
      const allUsers = await getAllUsers();
      setUsersList(allUsers);

      const interferences = await fetchInterferences();
    }
  };

  useEffect(() => {
    handleData();
  }, [selectedEnterprise]);

  return (
    <Wrapper>
      <Title>
        <SliderBackground>
          <SliderOption
            value="user"
            selectedOption={selectedOption}
            onClick={() => setSelectedOption("user")}
          >
            Usuários
          </SliderOption>
          <SliderOption
            value="interference"
            selectedOption={selectedOption}
            onClick={() => setSelectedOption("interference")}
          >
            Interferências
          </SliderOption>
          <Slider selectedOption={selectedOption} />
        </SliderBackground>

        <button
          onClick={
            selectedOption === "user" ? openUserForm : openInterferenceForm
          }
        >
          &#43;
        </button>
      </Title>
      <ListContainer>
        {selectedOption === "user"
          ? enterpriseRelationsList.map((user) => (
              <ListItem>{user.cpf_cnpj_usuario}</ListItem>
            ))
          : interferencesList.map((interference) => (
              <ListItem>{interference.cod_interferencia}</ListItem>
            ))}
      </ListContainer>
    </Wrapper>
  );
}

export default UsersAndInterferencesList;
