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

export const SliderBackground = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: #e9e9e9;
  border-radius: 5px;
  position: relative;
`;

export const SliderOption = styled.div`
  padding: 5px;

  z-index: 100;
  cursor: pointer;

  ${(props) =>
    props.selectedOption === props.value ? "color: white;" : "color: black;"}
`;

export const Slider = styled.div`
  position: absolute;
  background-color: rgba(var(--primary-color), 0.7);
  width: 50%;
  height: 100%;

  transition: 1s linear;

  ${(props) =>
    props.selectedOption === "user"
      ? "left: 0; border-radius: 5px 0 0 5px;"
      : "right: 0; border-radius: 0 5px 5px 0;"}
`;
