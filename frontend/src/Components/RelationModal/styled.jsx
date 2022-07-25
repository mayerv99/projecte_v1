import styled from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 150%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  margin-top: -50px;
`;

export const Wrapper = styled.div`
  background-color: white;
  width: 50%;
  margin: 60px auto;
  border-radius: 5px;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
    /* div { */
    /* display: flex; */
    /* flex-direction: column; */
    /* } */

    .header {
      text-transform: uppercase;
      font-weight: 700;
      text-align: center;
      font-size: 20px;
    }
  }

  .selectButtons {
    display: flex;
    justify-content: space-around;
  }

  h2 {
    font-size: 16px;
  }

  /* div { */
  /* display: flex; */
  /* justify-content: space-around; */
  /* margin-top: 20px; */
  /* } */

  .nextStep {
    margin-left: auto;
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
export const SearchDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .finish {
    margin-left: auto;
    width: 100%;
    margin-top: 20px;
  }
`;
export const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
`;
export const SearchButton = styled.button`
  width: 15%;
  margin-top: 18px;
`;

export const ListItem = styled.div`
  width: 100%;
  padding: 15px;
  line-height: 30px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: rgb(var(--primary-color));
  color: white;

  cursor: pointer;
`;
