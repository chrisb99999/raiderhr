import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Wrapper>
      <Logout
        onClick={() => {
          console.log("doing a logout... ");
          localStorage.clear();
          logout({ returnTo: window.location.origin });
        }}
      >
        Log Out
      </Logout>
    </Wrapper>
  );
};

export default LogoutButton;

const Logout = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  border-radius: 20px;

  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
