import React, { useState, createContext } from "react";

import { getAllEnterprises } from "../services/Enterprise/enterprises";

import RelationModal from "../Components/RelationModal";
import { ModalBackground } from "../Components/RelationModal/styled";

export const baseContext = createContext();

export default function BaseContextProvider({ children }) {
  const [enterprisesList, setEnterprisesList] = useState([]);
  const [selectedEnterprise, setSelectedEnterprise] = useState({});

  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [interferencesList, setInterferencesList] = useState([]);
  const [selectedInterference, setSelectedInterference] = useState({});

  const [isPrimaryUser, setIsPrimaryUser] = useState(false);

  const fecthEnterprises = async () => {
    const res = await getAllEnterprises();

    setEnterprisesList(res);
  };

  const userFormDataInitialValue = {
    userData: {
      EMP_NU_CPFCNPJ: "",
      EMP_NM_USUARIO: "",
      EMP_NU_DDD: 0,
      EMP_NU_TELEFONE: 0,
      EMP_DS_EMAILRESPONSAVEL: "",
      EMP_DS_LOGRADOURO: "",
      EMP_DS_COMPLEMENTOENDERECO: "",
      EMP_NU_LOGRADOURO: 0,
      EMP_DS_BAIRRO: "",
      EMP_NM_MUNICIPIO: "",
      EMP_SG_UF: "",
      EMP_NU_CAIXAPOSTAL: 0,
    },
    ...(isPrimaryUser
      ? {
          relation: {
            CPF_CNPJ_USUARIO: "",
            COD_EMPREENDIMENTO: "",
            RELACAO_USUARIO_PROPRIETARIO: "",
            TIPO_ACORDO_COM_PROPRIETARIO: "",
            INT_NU_CNARH: "",
            INT_CD_REGLA: "",
            POSSUI_AREA_PLANTADA: false,
            REGULARIZADO: false,
            PRESENTE_NO_LOCAL: false,
            OUTRAS_INFORMACOES: "",
          },
        }
      : {
          relation: {
            CPF_CNPJ_USUARIO: "",
            COD_EMPREENDIMENTO: "",
            RELACAO_USUARIO_PRINCIPAL_SECUNDARIO: "",
            INT_NU_CNARH: "",
            INT_CD_REGLA: "",
            SITUACAO_IRRIGACAO: false,
            REGULARIZADO: false,
            PRESENTE_NO_LOCAL: false,
            OUTRAS_INFORMACOES: "",
          },
        }),
  };

  const userFormData = userFormDataInitialValue;

  return (
    <baseContext.Provider
      value={{
        enterprisesList,
        setEnterprisesList,
        selectedEnterprise,
        setSelectedEnterprise,
        usersList,
        setUsersList,
        selectedUser,
        setSelectedUser,
        interferencesList,
        setInterferencesList,
        selectedInterference,
        setSelectedInterference,
        fecthEnterprises,
        isPrimaryUser,
        setIsPrimaryUser,
        userFormData,
      }}
    >
      {children}
    </baseContext.Provider>
  );
}
