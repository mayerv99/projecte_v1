import React, { useState, createContext } from "react";

import { getAllEnterprises } from "../services/Enterprise/enterprises";

export const baseContext = createContext();

export default function BaseContextProvider({ children }) {
  const [enterprisesList, setEnterprisesList] = useState([]);
  const [selectedEnterprise, setSelectedEnterprise] = useState({});

  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [interferencesList, setInterferencesList] = useState([]);
  const [selectedInterference, setSelectedInterference] = useState({});

  const fecthEnterprises = async () => {
    const res = await getAllEnterprises();

    setEnterprisesList(res);
  };

  const openRelationModal = () => {
    return <RelationModal />;
  };

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
        openRelationModal,
      }}
    >
      {children}
    </baseContext.Provider>
  );
}
