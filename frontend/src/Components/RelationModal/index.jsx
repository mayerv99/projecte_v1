import React, { useContext, useEffect, useRef, useState } from "react";

import {
  ModalBackground,
  Wrapper,
  SearchInput,
  SearchButton,
  InputDiv,
  SearchDiv,
  ListItem,
  RadioDiv,
} from "./styled";

import { baseContext } from "../../Context/CompanyContext";

import Select from "react-select";

import {
  getPrimaryUsers,
  createPrimaryUser,
} from "../../services/Users/primaryUsers";

import { createSecondaryUser } from "../../services/Users/secondaryUsers";

import { checkIfUserExists } from "../../services/Users/Users";

import { Form } from "@unform/web";

import Input from "../Forms/Input";

import {
  primaryUserOwnerRelation,
  secondaryUserPrimaryUserRelation,
} from "../Forms/FieldsOptions/relationFields";

function RelationModal({
  setFormVisibility,
  setUserAndRelationFormData,
  userAndRelationFormData,
  userToBeSelected,
  setUserToBeSelected,
  setUserType,
  userType,
  relacao_usuario_proprietario,
  setRelacao_usuario_proprietario,
  relacao_usuario_principal_secundario,
  setRelacao_usuario_principal_secundario,
  irrigacaoStatus,
  setIrrigacaoStatus,
  wasPresent,
  setWasPresent,
  isRegular,
  setIsRegular,
}) {
  const { selectedEnterprise, fetchUsers } = useContext(baseContext);

  const userRef = useRef(null);

  const formRef = useRef(null);

  const [hasPrimaryUser, setHasPrimaryUser] = useState(false);
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const checkButtonDisabled = async () => {
    const primaryUsers = await getPrimaryUsers(selectedEnterprise);
    if (primaryUsers && primaryUsers.length > 0) {
      return setHasPrimaryUser(true);
    }
    return setHasPrimaryUser(false);
  };

  const openUserSearch = (userType) => {
    console.log({ irrigacaoStatus, wasPresent, isRegular });
    setStep(2);
    setUserType(userType);
  };

  const handleSelectUser = (user) => {
    setUserToBeSelected(user);
  };

  const searchUser = async () => {
    const user = await checkIfUserExists(userRef.current.value);
    setIsChecked(true);
    if (user && user.emp_nu_cpfcnpj) {
      return handleSelectUser(user);
    }
    setUserToBeSelected({});
    return false;
  };

  const createRelationWithExistingUser = async () => {
    const newPrimaryUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        relacao_usuario_proprietario: relacao_usuario_proprietario.value,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userToBeSelected.emp_nu_cpfcnpj,
        possui_area_plantada: irrigacaoStatus,
        regularizado: isRegular,
        presente_no_local: wasPresent,
      },
    };

    setFormVisibility(0);
    if (userType === "primary") {
      await createPrimaryUser(newPrimaryUserData.relationData);
      return fetchUsers();
    }
    const newSecondaryUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        relacao_usuario_principal_secundario:
          relacao_usuario_principal_secundario.value,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userToBeSelected.emp_nu_cpfcnpj,
        situacao_irrigacao: irrigacaoStatus,
        regularizado: isRegular,
        presente_no_local: wasPresent,
      },
    };
    await createSecondaryUser(newSecondaryUserData.relationData);
    return fetchUsers();
  };

  const handleSubmitPrimary = (data) => {
    setUserAndRelationFormData({
      userType: "primary",
      relationData: {
        ...data,
        possui_area_plantada: irrigacaoStatus,
        regularizado: isRegular,
        presente_no_local: wasPresent,
      },
    });
    setStep(3);
  };

  const handleSubmitSecondary = (data) => {
    setUserAndRelationFormData({
      userType: "secondary",
      relationData: {
        ...data,
        situacao_irrigacao: irrigacaoStatus,
        regularizado: isRegular,
        presente_no_local: wasPresent,
      },
    });
    setStep(3);
  };

  useEffect(() => {
    checkButtonDisabled();
  }, []);

  return (
    <ModalBackground>
      <Wrapper>
        {step === 1 && (
          <>
            <h2>Selecione o tipo de usuário que deseja cadastrar:</h2>
            <div className="selectButtons">
              {!hasPrimaryUser && (
                <button onClick={() => openUserSearch("primary")}>
                  Usuário principal
                </button>
              )}
              <button onClick={() => openUserSearch("secondary")}>
                Usuário secundário
              </button>
            </div>
            <span>
              Caso apareça apenas a opção de "Usuário secundário", o
              empreendimento ja possui um usuário principal
            </span>
          </>
        )}
        {step === 2 &&
          (userType === "primary" ? (
            <Form ref={formRef} onSubmit={handleSubmitPrimary}>
              <div className="header">Cadastro de usuário principal</div>
              <>
                <label>Relação usuário responsável-proprietário:</label>
                <Select
                  options={primaryUserOwnerRelation || []}
                  value={relacao_usuario_proprietario}
                  onChange={(e) => {
                    if (e) {
                      setRelacao_usuario_proprietario(e);
                    }
                  }}
                />
              </>

              <Input
                name="tipo_acordo_com_proprietario"
                label="Descrição do tipo de acordo firmado com o proprietario, com indicação do período do acordo (quando não for condição de parentesco)"
              />
              <Input name="int_nu_cnarg" label="Num. CNARH" />
              <Input name="int_cd_regla" label="ID REGLA" />
              <RadioDiv>
                <p>Possui área irrigada no momento do cadastro?</p>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="possui_area_plantada"
                    value={true}
                    checked={irrigacaoStatus}
                    onChange={() => setIrrigacaoStatus(true)}
                  />
                  <label>Sim</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="possui_area_plantada"
                    value={false}
                    checked={!irrigacaoStatus}
                    onChange={() => setIrrigacaoStatus(false)}
                  />
                  <label>Não</label>
                </div>
              </RadioDiv>
              <RadioDiv>
                <p>É regularizado?</p>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="isRegular"
                    value={true}
                    checked={isRegular}
                    onChange={() => setIsRegular(true)}
                  />
                  <label>Sim</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="isRegular"
                    value={false}
                    checked={!isRegular}
                    onChange={() => setIsRegular(false)}
                  />
                  <label>Não</label>
                </div>
              </RadioDiv>
              <RadioDiv>
                <p>Estava presente no local?</p>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="wasPresent"
                    value={true}
                    checked={wasPresent}
                    onChange={() => setWasPresent(true)}
                  />
                  <label>Sim</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="wasPresent"
                    value={false}
                    checked={!wasPresent}
                    onChange={() => setWasPresent(false)}
                  />
                  <label>Não</label>
                </div>
              </RadioDiv>
              <Input
                name="outras_informacoes"
                label="Outras informações relevantes"
              />
              <button className="nextStep" type="submit">
                Avançar
              </button>
            </Form>
          ) : (
            <Form ref={formRef} onSubmit={handleSubmitSecondary}>
              <div className="header">Cadastro de usuário secundário</div>
              <Select
                value={relacao_usuario_principal_secundario}
                options={secondaryUserPrimaryUserRelation || []}
                onChange={(e) => {
                  if (e) {
                    setRelacao_usuario_principal_secundario(e);
                  }
                }}
              />
              <Input name="int_nu_cnarh" label="Num. CNARH" />
              <Input name="int_cd_regla" label="ID REGLA" />
              <RadioDiv>
                <p>Possui área irrigada no momento do cadastro?</p>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="situacao_irrigacao"
                    value={true}
                    checked={irrigacaoStatus}
                    onChange={() => setIrrigacaoStatus(true)}
                  />
                  <label>Sim</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="situacao_irrigacao"
                    value={false}
                    checked={!irrigacaoStatus}
                    onChange={() => setIrrigacaoStatus(false)}
                  />
                  <label>Não</label>
                </div>
              </RadioDiv>
              <RadioDiv>
                <p>É regularizado?</p>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="isRegular"
                    value={true}
                    checked={isRegular}
                    onChange={() => setIsRegular(true)}
                  />
                  <label>Sim</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="isRegular"
                    value={false}
                    checked={!isRegular}
                    onChange={() => setIsRegular(false)}
                  />
                  <label>Não</label>
                </div>
              </RadioDiv>
              <RadioDiv>
                <p>Estava presente no local?</p>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="wasPresent"
                    value={true}
                    checked={wasPresent}
                    onChange={() => setWasPresent(true)}
                  />
                  <label>Sim</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="wasPresent"
                    value={false}
                    checked={!wasPresent}
                    onChange={() => setWasPresent(false)}
                  />
                  <label>Não</label>
                </div>
              </RadioDiv>
              <Input
                name="outras_informacoes"
                label="Outras informações relevantes"
              />
              <button className="nextStep" type="submit">
                Avançar
              </button>
            </Form>
          ))}

        {step === 3 && (
          <SearchDiv>
            <h2>Buscar usuário</h2>
            <InputDiv>
              <div className="wrapper">
                <label>CPF ou CNPJ do usuário</label>
                <SearchInput ref={userRef} />
              </div>
              <SearchButton onClick={searchUser}>Buscar</SearchButton>
            </InputDiv>

            {userToBeSelected && userToBeSelected.emp_nu_cpfcnpj && (
              <ListItem>
                {userToBeSelected.emp_nu_cpfcnpj} -{" "}
                {userToBeSelected.emp_nm_usuario}
              </ListItem>
            )}
            {isChecked ? (
              userToBeSelected && userToBeSelected.emp_nu_cpfcnpj ? (
                <button
                  className="finish"
                  onClick={createRelationWithExistingUser}
                >
                  Criar relacionamento
                </button>
              ) : (
                <button className="finish" onClick={() => setFormVisibility(3)}>
                  Cadastrar novo usuário
                </button>
              )
            ) : null}
          </SearchDiv>
        )}
      </Wrapper>
    </ModalBackground>
  );
}

export default RelationModal;
