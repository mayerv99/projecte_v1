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
import MaskedInput from "../Input/MaskedInput";

function EnterpriseForm({ setFormVisibility }) {
  const formRef = useRef(null);

  const { fecthEnterprises } = useContext(baseContext);

  const [hasWaterUse, setHasWaterUse] = useState(null);
  const [isCPF, setIsCPF] = useState(true);

  const handleSubmit = async (data) => {
    const res = await axios
      .post("http://localhost:8080/empreendimento", {
        ...data,
        ha_uso_de_agua: hasWaterUse,
      })
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
            <MaskedInput
              name="cod_empreendimento"
              label="Código do empreendimento: "
              width="20%"
              inputMask="Exxxx"
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
            Há uso de água?
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <input
                type="radio"
                checked={hasWaterUse === true}
                name="waterUse"
                value={true}
                onChange={() => setHasWaterUse(true)}
              />
              <label>Sim</label>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <input
                type="radio"
                checked={hasWaterUse === false}
                name="waterUse"
                value={false}
                onChange={() => setHasWaterUse(false)}
              />
              <label>Não</label>
            </div>
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
