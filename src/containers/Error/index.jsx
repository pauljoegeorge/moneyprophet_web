import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Wrapper = styled.div`
  text-align: center;
  margin-top: 80px;
  cursor: pointer;
  font-size: 44px;
`;

function ErrorContainer() {
  const history = useHistory();
  return (
    <Wrapper>
      <h1>#[WIP]</h1>
      <button type="submit" onClick={() => history.push("/")}>
        <BiArrowBack size={60} />
      </button>
    </Wrapper>
  );
}

export default ErrorContainer;
