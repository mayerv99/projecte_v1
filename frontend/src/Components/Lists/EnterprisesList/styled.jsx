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
