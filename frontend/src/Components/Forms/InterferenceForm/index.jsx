import React, { useContext, useEffect, useRef, useState } from "react";

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

import Select from "react-select";

import { interferenceDataAdapter } from "./adapter";

import {
  interferenceType,
  interferenceSubType,
  waterBodyType,
  domain,
  energySource,
  interferenceSituation,
  goalOptions,
  cultivationType,
  animalCreation,
  creationSystem,
} from "../FieldsOptions/interferenceOptions";
import { createInterference } from "../../../services/Interferences/interferences";

function InterferenceForm({ setFormVisibility }) {
  const formRef = useRef(null);

  const { fetchInterferences, selectedEnterprise } = useContext(baseContext);

  const selectFieldValuesInitialValues = {
    int_tin_ds: {},
    int_tsu_ds: {},
    int_tch_ds: {},
    int_tdm_ds: {},
    fonte_energia: {},
    int_tsi_ds: {},
    fin_tfn_ds: {},
    fin_secundaria: {},
    fin_terciaria: {},
    ttc_tcu_ds: {},
    cte_tca_ds: {},
    cts_tsc_ds: {},
    cte_tsa_ds: {},
    cte_tsc_ds: {},
  };
  const [selectFieldsValues, setSelectFieldsValues] = useState(
    selectFieldValuesInitialValues
  );

  const handleSubmit = async (data) => {
    await createInterference(
      interferenceDataAdapter({
        ...data,
        ...selectFieldsValues,
        codEmpreendimento: selectedEnterprise,
      })
    );
    await fetchInterferences();
    setFormVisibility(0);
  };

  const setFormValues = (values) => {
    setSelectFieldsValues((prevsValues) => ({
      ...prevsValues,
      ...values,
    }));
  };

  useEffect(() => {
    console.log(selectFieldsValues);
  }, [selectFieldsValues]);

  const selectFieldStyle = {
    container: (base) => ({
      ...base,
      width: "100%",
      marginTop: 30,
      height: 50,
    }),
    control: (base) => ({
      ...base,
      height: 50,
    }),
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
              width="20%"
              name="cod_interferencia"
              label="Código da interferência:"
            />
            <Input
              width="20%"
              type="number"
              name="unidade_consumidora"
              label="Unidade consumidora: "
            />
            <Input width="60%" name="nome_inscrito" label="Nome inscrito:" />
          </InputWrapper>
          <InputWrapper>
            <Input
              width="30%"
              name="int_cd_regla"
              label="Denominação do ponto: "
            />
            <Select
              styles={selectFieldStyle}
              options={interferenceType || []}
              placeholder="Tipo da interferência"
              value={selectFieldsValues.int_tin_ds}
              onChange={(e) => {
                if (e) {
                  setFormValues({ int_tin_ds: e });
                }
              }}
            />
            <Select
              styles={selectFieldStyle}
              options={interferenceSubType || []}
              placeholder="Subtipo da interferência"
              value={selectFieldsValues.int_tsu_ds}
              onChange={(e) => {
                if (e) {
                  setFormValues({ int_tsu_ds: e });
                }
              }}
            />
          </InputWrapper>

          <InputWrapper>
            <Input name="int_nm_corpohidrico" label="Nome do corpo hídrico:" />
            {/* Pos campo */}
            <Select
              styles={selectFieldStyle}
              options={waterBodyType || []}
              value={selectFieldsValues.int_tch_ds}
              placeholder="Tipo do corpo hídrico:"
              onChange={(e) => {
                if (e) {
                  setFormValues({ int_tch_ds: e });
                }
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Input name="int_nu_latitude" label="Latidude:" type="number" />
            <Input name="int_nu_longitude" label="Longitude:" type="number" />
          </InputWrapper>
          <InputWrapper>
            <Input width="20%" name="ing_sg_ufminicipio" label="UF:" />
            <Input name="ing_nm_municipio" label="Município:" />
          </InputWrapper>
          {/* ACABA O POS CAMPO */}
          <InputWrapper>
            <Select
              styles={selectFieldStyle}
              value={selectFieldsValues.int_tdm_ds}
              placeholder="Domínio"
              options={domain || []}
              onChange={(e) => {
                if (e) {
                  setFormValues({ int_tdm_ds: e });
                }
              }}
            />
            <Select
              styles={selectFieldStyle}
              placeholder="Fonte de energia"
              value={selectFieldsValues.fonte_energia}
              onChange={(e) => {
                if (e) {
                  setFormValues({ fonte_energia: e });
                }
              }}
              options={energySource || []}
            />
            <Select
              styles={selectFieldStyle}
              placeholder="Situação da interferência"
              value={selectFieldsValues.int_tsi_ds}
              onChange={(e) => {
                if (e) {
                  setFormValues({ int_tsi_ds: e });
                }
              }}
              options={interferenceSituation || []}
            />
          </InputWrapper>
          <h2
            style={{
              marginTop: 20,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              paddingTop: 20,
            }}
          >
            Finalidade
          </h2>
          <InputWrapper>
            <Select
              styles={selectFieldStyle}
              placeholder="Finalidade principal"
              value={selectFieldsValues.fin_tfn_ds}
              onChange={(e) => {
                if (e) {
                  setFormValues({ fin_tfn_ds: e });
                }
              }}
              options={goalOptions || []}
            />
            <Select
              styles={selectFieldStyle}
              placeholder="Finalidade secundária"
              value={selectFieldsValues.fin_secundaria}
              onChange={(e) => {
                if (e) {
                  setFormValues({ fin_secundaria: e });
                }
              }}
              options={goalOptions || []}
            />
            <Select
              styles={selectFieldStyle}
              placeholder="Finalidade terciária"
              value={selectFieldsValues.fin_terciaria}
              onChange={(e) => {
                if (e) {
                  setFormValues({ fin_terciaria: e });
                }
              }}
              options={goalOptions || []}
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              name="numero_tanques"
              type="number"
              label="Número de tanques finalidade aquicultura:"
            />
            <Input
              name="fes_nu_profundidademediatanque"
              type="number"
              label="Profundidade (m) tanques aquicultura:"
            />
            <Input
              name="fes_nu_areatotaltanque"
              type="number"
              label="Área total dos tanques (m2) finalidade aquicultura:"
            />
          </InputWrapper>
          <Select
            styles={selectFieldStyle}
            placeholder="Cultivo finalidade aquicultura"
            value={selectFieldsValues.ttc_tcu_ds}
            options={cultivationType || []}
            onChange={(e) => {
              if (e) {
                setFormValues({ ttc_tcu_ds: e });
              }
            }}
          />
          <h2
            style={{
              marginTop: 20,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              paddingTop: 20,
            }}
          >
            Criação animal
          </h2>
          <InputWrapper>
            <Select
              styles={selectFieldStyle}
              placeholder="Espécie 1"
              value={selectFieldsValues.cte_tca_ds}
              onChange={(e) => {
                if (e) {
                  setFormValues({ cte_tca_ds: e });
                }
              }}
              options={animalCreation || []}
            />
            <Select
              styles={selectFieldStyle}
              placeholder="Sistema de criação animal 1"
              value={selectFieldsValues.cte_tsc_ds}
              onChange={(e) => {
                if (e) {
                  setFormValues({ cte_tsc_ds: e });
                }
              }}
              options={creationSystem || []}
            />
            <Input name="cte_nu_cabecas" label="Número de cabeças criação 1:" />
          </InputWrapper>
          <Input
            name="observacao_finalidade"
            label="Observações em relação as finalidades:"
          />
          <FormFooter>
            <button type="submit">Salvar</button>
          </FormFooter>
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

export default InterferenceForm;
