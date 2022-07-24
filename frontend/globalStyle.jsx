import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;

    }

    :root{
        --primary-color: 0, 92, 225;
    }

    body{
        background-color: #e9e9e9;
    }



`;
