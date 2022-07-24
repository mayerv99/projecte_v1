import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  width: 100%;
  margin-top: 20px;
  text-transform: uppercase;
  font-size: 14px;

  display: flex;
  justify-content: center;
  gap: 20px;
  line-height: 30px;

  button {
    padding: 5px 8px;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: rgba(var(--primary-color), 0.7);
    color: white;
    font-size: 16px;

    transition: 0.2s linear;
    cursor: pointer;

    :hover {
      background-color: rgb(var(--primary-color));
    }
  }
`;

export const ListContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ListItem = styled.div`
  width: 90%;
  padding: 15px;
  line-height: 30px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isSelected ? "rgb(var(--primary-color))" : "#e9e9e9"};
  color: ${(props) => (props.isSelected ? "white" : "black")};

  cursor: pointer;
  transition: 0.2s linear;

  :hover {
    ${(props) =>
      !props.isSelected && "background-color: rgba(var(--primary-color), 0.3)"}
  }
`;
