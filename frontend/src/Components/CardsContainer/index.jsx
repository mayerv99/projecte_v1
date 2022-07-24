import React, { useState } from "react";

import Card from "../Card";
import EnterpriseForm from "../Forms/EnterpriseForm";
import EnterprisesList from "../Lists/EnterprisesList";
import UsersAndInterferencesList from "../Lists/UsersAndInterferencesList";
import UserForm from "../Forms/UserForm";
import RelationModal from "../RelationModal";

import { Wrapper } from "./styled";

function CardsContainer() {
  const [formVisibility, setFormVisibility] = useState(0);

  return (
    <Wrapper>
      {formVisibility === 1 && (
        <EnterpriseForm setFormVisibility={setFormVisibility} />
      )}
      {formVisibility === 2 && (
        <RelationModal setFormVisibility={setFormVisibility} />
      )}
      {/* {formVisibility === 3 && (
        <InterferenceForm setFormVisibility={setFormVisibility} />
      )} */}
      <Card>
        <EnterprisesList setFormVisibility={setFormVisibility} />
      </Card>
      <Card>
        <UsersAndInterferencesList setFormVisibility={setFormVisibility} />
      </Card>
    </Wrapper>
  );
}

export default CardsContainer;