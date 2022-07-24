import React from "react";

import {
  Header,
  Wrapper,
  FormContainer,
  InputWrapper,
  FormFooter,
} from "./styled";

import { Form, Scope } from "@unform/web";

import Input from "../Input";

import { baseContext } from "../../../Context/CompanyContext";

function UserForm() {
  return (
    <Wrapper>
      <Header>
        <button onClick={() => setFormVisibility(0)}>&#10006;</button>
      </Header>
      <FormContainer></FormContainer>
    </Wrapper>
  );
}

export default UserForm;
