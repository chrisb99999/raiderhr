import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <Login onClick={() => loginWithRedirect()}>Sign Up</Login>
    </Wrapper>
  );
};

export default LoginButton;

const Login = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  border: 2px solid black;
  border-radius: 20px;

  padding: 7px;
  display: flex;
  align-items: center;
`;
