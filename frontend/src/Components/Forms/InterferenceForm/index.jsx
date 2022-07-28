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

import {
  interferenceDataAdapter,
  returnOnlyUnformFields,
  getSelectFieldOptions,
} from "./adapter";

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
import {
  createInterference,
  editInterference,
} from "../../../services/Interferences/interferences";

function InterferenceForm({ setFormVisibility }) {
  const formRef = useRef(null);

  const { fetchInterferences, selectedEnterprise, selectedInterference } =
    useContext(baseContext);

  const selectFieldValuesInitialValues = !selectedInterference
    ? {
        int_tin_ds: "",
        int_tsu_ds: "",
        int_tch_ds: "",
        int_tdm_ds: "",
        fonte_energia: "",
        int_tsi_ds: "",
        fin_tfn_ds: "",
        fin_secundaria: "",
        fin_terciaria: "",
        ttc_tcu_ds: "",

        cte_tca_ds_1: "",
        cte_tsc_ds_1: "",

        cte_tca_ds_2: "",
        cte_tsc_ds_2: "",
      }
    : getSelectFieldOptions(selectedInterference);

  const [selectFieldsValues, setSelectFieldsValues] = useState(
    selectFieldValuesInitialValues
  );

  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async (data) => {
    if (isEdit) {
      await editInterference(
        interferenceDataAdapter({
          ...data,
          ...selectFieldsValues,
          codEmpreendimento: selectedEnterprise,
        })
      );
      setIsEdit(false);
      await fetchInterferences();
      return setFormVisibility(0);
    }
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
    if (selectedInterference) {
      setIsEdit(true);
      console.log(returnOnlyUnformFields(selectedInterference));
      formRef.current.setData(returnOnlyUnformFields(selectedInterference));
    }
  }, []);

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
          <h2
            style={{
              marginTop: 20,
              width: "100%",
              borderBottom: "1px solid #e9e9e9",
              paddingBottom: 20,
              marginBottom: 20,
            }}
          >
            Empreendimento: {selectedEnterprise}
          </h2>
          <InputWrapper>
            <Input
              width="20%"
              name="cod_interferencia"
              label="Código da interferência:"
              disable={isEdit}
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
              placeholder={"Tipo da interferência"}
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
          <Input name="int_nm_corpohidrico" label="Nome do corpo hídrico:" />
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
              value={selectFieldsValues.cte_tca_ds_1}
              onChange={(e) => {
                if (e) {
                  setFormValues({ cte_tca_ds_1: e });
                }
              }}
              options={animalCreation || []}
            />
            <Select
              styles={selectFieldStyle}
              placeholder="Sistema de criação animal 1"
              value={selectFieldsValues.cte_tsc_ds_1}
              onChange={(e) => {
                if (e) {
                  setFormValues({ cte_tsc_ds_1: e });
                }
              }}
              options={creationSystem || []}
            />
            <Input
              name="cte_nu_cabecas_1"
              label="Número de cabeças criação 1:"
            />
          </InputWrapper>
          <InputWrapper>
            <Select
              styles={selectFieldStyle}
              placeholder="Espécie 2"
              value={selectFieldsValues.cte_tca_ds_2}
              onChange={(e) => {
                if (e) {
                  setFormValues({ cte_tca_ds_2: e });
                }
              }}
              options={animalCreation || []}
            />
            <Select
              styles={selectFieldStyle}
              placeholder="Sistema de criação animal 2"
              value={selectFieldsValues.cte_tsc_ds_2}
              onChange={(e) => {
                if (e) {
                  setFormValues({ cte_tsc_ds_2: e });
                }
              }}
              options={creationSystem || []}
            />
            <Input
              name="cte_nu_cabecas_2"
              label="Número de cabeças criação 2:"
            />
          </InputWrapper>
          <InputWrapper>
            <Input name="nu_pessoas" label="Número de pessoas" width="20%" />
            <Input
              name="observacao_finalidade"
              label="Observações em relação as finalidades:"
            />
          </InputWrapper>
          <>
            <h2
              style={{
                marginTop: 20,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                paddingTop: 20,
              }}
            >
              Pós campo
            </h2>
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
            <InputWrapper>
              <Input name="int_nu_latitude" label="Latidude:" type="number" />
              <Input name="int_nu_longitude" label="Longitude:" type="number" />
            </InputWrapper>
            <InputWrapper>
              <Input width="20%" name="ing_sg_ufmunicipio" label="UF:" />
              <Input name="ing_nm_municipio" label="Município:" />
            </InputWrapper>
          </>

          <FormFooter>
            <button type="submit">Salvar</button>
          </FormFooter>
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

export default InterferenceForm;
