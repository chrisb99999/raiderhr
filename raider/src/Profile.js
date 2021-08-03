import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Profile = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      Profile Page
      {isShown && <BackGroundWord>{bgWord.toUpperCase()}</BackGroundWord>}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  height: 100%;
`;
const BackGroundWord = styled.div`
  position: absolute;
  right: 20px;
  bottom: 2px;
  font-size: 8em;
  font-family: "Lausanne650";
  color: #d7d7d7;
  transition: 0.3s ease-in-out;
`;
