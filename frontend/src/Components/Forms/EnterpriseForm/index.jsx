import React, { useState, useRef, useContext } from "react";

import {
  Header,
  Wrapper,
  FormContainer,
  InputWrapper,
  FormFooter,
} from "./styled";

import { Form } from "@unform/web";

import Input from "../Input";

import axios from "axios";

import { baseContext } from "../../../Context/CompanyContext";

function EnterpriseForm({ setFormVisibility }) {
  const formRef = useRef(null);

  const { fecthEnterprises } = useContext(baseContext);

  const handleSubmit = async (data) => {
    console.log(data);
    const res = await axios
      .post("http://localhost:8080/empreendimento", data)
      .then((res) => res.data);

    await fecthEnterprises();
    setFormVisibility(0);
  };

  return (
    <Wrapper>
      <Header>
        <button onClick={() => setFormVisibility(0)}>&#10006;</button>
      </Header>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              name="cod_empreendimento"
              label="Código do empreendimento: "
              placeholder=""
              width="20%"
            />
            <Input
              name="emp_nm_empreeendimento"
              label="Nome do empreendimento: "
            />
          </InputWrapper>
          <InputWrapper>
            <Input name="nome_proprietario" label="Nome do proprietário: " />
            <Input
              name="cpf_cnpj_proprietario"
              label="CPF ou CNPJ do proprietário: "
              width="30%"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="date"
              name="data_cadastro"
              label="Data cadastro georreferenciado campo: "
              width="30%"
            />

            <Input name="endereco" label="Endereço local: " />
          </InputWrapper>
          <Input name="complemento_endereco" label="Complemento: " />
          <Input name="referencia_endereco" label="Ponto de referência: " />
          <h4
            style={{
              fontSize: "14px",
              marginTop: "10px",
              marginBottom: "5px",
              fontWeight: 700,
            }}
          >
            Há uso de água
          </h4>
          <div style={{ height: 50 }}>
            <input name="Water" id="waterTrue" type="radio" value={true} />
            <label style={{ marginLeft: 10 }} htmlFor="waterTrue">
              Sim
            </label>
          </div>
          <div>
            <input name="Water" id="waterFalse" type="radio" value={false} />
            <label style={{ marginLeft: 10 }} htmlFor="waterFalse">
              Não
            </label>
          </div>

          <FormFooter>
            <button type="submit">Salvar</button>
          </FormFooter>
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

export default EnterpriseForm;
