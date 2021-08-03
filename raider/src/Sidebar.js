import React from "react";
import styled from "styled-components";
import SideLink from "./SideLink";

const Sidebar = ({ setIsShown, setBgWord }) => {
  return (
    <Wrapper>
      <SideLink name={"Home"} setIsShown={setIsShown} setBgWord={setBgWord} />
      <SideLink
        name={"Profile"}
        setIsShown={setIsShown}
        setBgWord={setBgWord}
      />
      <SideLink setIsShown={setIsShown} name={"People"} setBgWord={setBgWord} />
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  width: 17%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  margin: 5px 5px 5px 5px;
  border-radius: 5px;
  align-items: center;
`;
