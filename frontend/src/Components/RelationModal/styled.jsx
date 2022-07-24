import styled from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const Wrapper = styled.div`
  background-color: white;
  width: 50%;
  margin: 60px auto;
  border-radius: 5px;
  padding: 20px;

  h2 {
    font-size: 16px;
  }

  div {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  button {
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;

    width: 30%;
    height: 50px;
    padding: 10px;

    border-radius: 5px;

    transition: 0.2s linear;

    :hover {
      background-color: rgba(var(--primary-color), 0.5);
    }
  }

  span {
    margin-top: 50px;
    font-size: 12px;
  }
`;
