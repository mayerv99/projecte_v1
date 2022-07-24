import React, { useContext, useState } from "react";

import { baseContext } from "../../../Context/CompanyContext";

import {
  Title,
  Wrapper,
  SliderBackground,
  SliderOption,
  Slider,
} from "./styled";

function UsersAndInterferencesList({ setFormVisibility }) {
  const [selectedOption, setSelectedOption] = useState("user");

  const openUserForm = () => {
    setFormVisibility(2);
  };

  const openInterferenceForm = () => {
    setFormVisibility(3);
  };

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
    </Wrapper>
  );
}

export default UsersAndInterferencesList;
