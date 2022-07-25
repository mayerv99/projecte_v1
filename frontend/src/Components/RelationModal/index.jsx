import React, { useContext, useEffect, useRef, useState } from "react";

import {
  ModalBackground,
  Wrapper,
  SearchInput,
  SearchButton,
  InputDiv,
  SearchDiv,
  ListItem,
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
      },
    };
    const newSecondaryUserData = {
      relationData: {
        ...userAndRelationFormData.relationData,
        relacao_usuario_principal_secundario:
          relacao_usuario_principal_secundario.value,
        codEmpreendimento: selectedEnterprise,
        cpf_cnpj_usuario: userToBeSelected.emp_nu_cpfcnpj,
      },
    };
    setFormVisibility(0);
    if (userType === "primary") {
      await createPrimaryUser(newPrimaryUserData.relationData);
      return fetchUsers();
    }
    await createSecondaryUser(newSecondaryUserData.relationData);
    return fetchUsers();
  };

  const handleSubmitPrimary = (data) => {
    setUserAndRelationFormData({
      userType: "primary",
      relationData: data,
    });
    setStep(3);
  };

  const handleSubmitSecondary = (data) => {
    setUserAndRelationFormData({
      userType: "secondary",
      relationData: data,
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
              <Input
                name="possui_area_plantada"
                label="Possui área irrigada plantada no momento do cadastro?"
              />
              <Input name="regularizado" label="É Regularizado?" />
              <Input
                name="presente_no_local"
                label="Estava presente no local?"
              />
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
              <Input
                name="situacao_irrigacao"
                label="Possui área irrigada no momento do cadastro?"
              />
              <Input name="regularizado" label="É regularizado? " />
              <Input
                name="presente_no_local"
                label="Estava presente no local?"
              />
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
