import React, { useState, createContext } from "react";

import { getAllEnterprises } from "../services/Enterprise/enterprises";

import { getPrimaryUsers } from "../services/Users/primaryUsers";
import { getSecondaryUser } from "../services/Users/secondaryUsers";

export const baseContext = createContext();

export default function BaseContextProvider({ children }) {
  const [enterprisesList, setEnterprisesList] = useState([]);
  const [selectedEnterprise, setSelectedEnterprise] = useState({});

  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [enterpriseRelationsList, setEnterpriseRelationsList] = useState([]);

  const [interferencesList, setInterferencesList] = useState([]);
  const [selectedInterference, setSelectedInterference] = useState({});

  const [isPrimaryUser, setIsPrimaryUser] = useState(false);

  const fecthEnterprises = async () => {
    const res = await getAllEnterprises();

    setEnterprisesList(res);
  };

  const fetchUsers = async () => {
    const primaryUser = await getPrimaryUsers(selectedEnterprise);
    const secondaryUsers = await getSecondaryUser(selectedEnterprise);

    const usersArray = [...primaryUser, ...secondaryUsers];

    setEnterpriseRelationsList(usersArray);
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
        isPrimaryUser,
        setIsPrimaryUser,
        enterpriseRelationsList,
        setEnterpriseRelationsList,
        fetchUsers,
      }}
    >
      {children}
    </baseContext.Provider>
  );
}
