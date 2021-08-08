import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./CurrentUserContext";
import SideLink from "./SideLink";

const Sidebar = ({ setIsShown, setBgWord }) => {
  const { company } = useContext(UserContext);

  return (
    <Wrapper>
      {company && <CompanyName>@{company}</CompanyName>}
      <SideLink name={"Home"} setIsShown={setIsShown} setBgWord={setBgWord} />
      <SideLink
        name={"Profile"}
        setIsShown={setIsShown}
        setBgWord={setBgWord}
      />
      <SideLink setIsShown={setIsShown} name={"People"} setBgWord={setBgWord} />
      <SideLink setIsShown={setIsShown} name={"Jobs"} setBgWord={setBgWord} />
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  width: 17%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  margin: 5px 5px 5px 5px;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
`;

const CompanyName = styled.div`
  top: 0;
  margin: 0;
  height: 30px;
  font-family: "Lausanne650";
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
