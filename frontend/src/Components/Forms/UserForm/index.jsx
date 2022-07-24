import React, { useRef } from "react";

import {
  Header,
  Wrapper,
  FormContainer,
  InputWrapper,
  FormFooter,
} from "./styled";

import { Form } from "@unform/web";

import Input from "../Input";

import { baseContext } from "../../../Context/CompanyContext";

import { createNewUser } from "../../../services/Users/Users";

function UserForm({
  setFormVisibility,
  setUserToBeSelected,
  createRelationWithExistingUser,
}) {
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    await createNewUser(data);
    setUserToBeSelected(data);

    createRelationWithExistingUser(data.emp_nu_cpfcnpj);
  };

  return (
    <Wrapper>
      <Header>
        <button onClick={() => setFormVisibility(0)}>&#10006;</button>
      </Header>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="emp_nu_cpfcnpj" label="CPF ou CNPJ do usuário:" />
          <Input name="emp_nm_usuario" label="Nome do usuário:" />
          <InputWrapper>
            <Input name="emp_nu_ddd" type="number" label="DDD:" width="5%" />
            <Input
              name="emp_nu_telefone"
              type="number"
              label="Telefone:"
              width="15%"
            />
            <Input name="emp_ds_emailresponsavel" label="E-mail:" width="80%" />
          </InputWrapper>{" "}
          <Input name="emp_ds_logradouro" label="Logradouro:" />
          <Input name="emp_ds_complementoendereco" label="Complemento:" />
          <InputWrapper>
            <Input
              name="emp_nu_logradouro"
              label="Número:"
              type="number"
              width="20%"
            />
            <Input name="emp_ds_bairro" label="Bairro: " width="80%" />
          </InputWrapper>
          <Input name="emp_nm_municipio" label="Município:" />
          <InputWrapper>
            <Input name="emp_sg_uf" label="UF:" width="10%" />
            <Input name="emp_nu_cependereco" label="CEP:" width="45%" />
            <Input
              width="45%"
              name="emp_nu_caixapostal"
              label="Caixa postal:"
              type="number"
            />
          </InputWrapper>
          <FormFooter>
            <button style={{ marginTop: "30px" }} type="submit">
              Salvar
            </button>
          </FormFooter>
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

export default UserForm;
