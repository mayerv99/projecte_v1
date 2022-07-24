import React, { useContext } from "react";

import { GlobalStyle } from "../globalStyle";

import CardsContainer from "./Components/CardsContainer";

import BaseContextProvider from "./Context/CompanyContext";

function App() {
  return (
    <div>
      <GlobalStyle />
      <BaseContextProvider>
        <CardsContainer />
      </BaseContextProvider>
    </div>
  );
}

export default App;
