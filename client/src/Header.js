import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <HeadWrap isAuthenticated={isAuthenticated}>
      <Wrapper isAuthenticated={isAuthenticated}>
        {isAuthenticated ? "r" : "raider"}
        <span style={{ color: "orange" }}>.</span>
      </Wrapper>{" "}
      <ButtonWrap>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
      </ButtonWrap>
    </HeadWrap>
  );
};

export default Header;

const HeadWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({ isAuthenticated }) => {
    return isAuthenticated ? "#f5f5f5" : "white";
  }};
  z-index: 100;
  /* margin-bottom: 20px; */
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  font-size: 2em;
  font-family: "Special Elite";
  position: absolute;
  left: ${({ isAuthenticated }) => {
    return isAuthenticated ? "3% " : "47%";
  }};
  transition: 1000ms ease-in-out;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 4%;
`;
