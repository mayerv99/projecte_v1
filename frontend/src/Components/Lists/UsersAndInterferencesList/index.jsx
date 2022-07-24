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

  const { selectedEnterprise, usersList, setUsersList } =
    useContext(baseContext);

  const openUserForm = () => {
    setFormVisibility(2);
  };

  const openInterferenceForm = () => {
    setFormVisibility(3);
  };

  const getAllUsers = async () => {
    const primaryUser = await getPrimaryUsers(selectedEnterprise);
    const secondaryUsers = await getSecondaryUser(selectedEnterprise);

    const usersArray = [...primaryUser, ...secondaryUsers];

    const usersData = [];
    setEnterpriseRelations(usersArray);

    // usersArray.map(async (user) => {
    //   const userData = await checkIfUserExists(user.cpf_cnpj_usuario);
    //   usersData.push(userData);
    // });

    // setEnterpriseUsersData(usersData);

    // console.log("usersData: ", usersData);
    return usersData;
  };

  const handleData = async () => {
    if (selectedEnterprise) {
      if (selectedOption === "user") {
        const allUsers = await getAllUsers(selectedEnterprise);
        setUsersList(allUsers);
      }
      // if (selectedOption === "interference") {
      //   const interferences = await getInterferences(selectedEnterprise);
      // }
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
            onClick={() => console.log(usersList)}
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
        {enterpriseRelations.map((user) => (
          <ListItem>{user.cpf_cnpj_usuario}</ListItem>
        ))}
      </ListContainer>
    </Wrapper>
  );
}

export default UsersAndInterferencesList;
