import React from "react";

import styled from "styled-components";

const CalltoAction = ({ onClickFunction, text }) => {
  return <CtA onClick={onClickFunction}>{text}</CtA>;
};

export default CalltoAction;

const CtA = styled.button`
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid orange;
  height: 100px;
  background-color: #fcfcfc;
  width: 100%;
  &:hover {
    cursor: pointer;

    box-shadow: 0 0 0.15rem 0.075rem orange;
  }
`;
