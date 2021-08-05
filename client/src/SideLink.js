import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SideLink = ({ name, setIsShown, setBgWord }) => {
  let link = "/" + name;

  return (
    <Wrapper
      onMouseEnter={() => {
        setIsShown(true);
        setBgWord(name);
      }}
      onMouseLeave={() => {
        setIsShown(false);
        setBgWord("");
      }}
    >
      <LinkName to={link}>{name}</LinkName>
    </Wrapper>
  );
};

export default SideLink;

const Wrapper = styled.div`
  text-decoration: none;
  color: black;
  text-align: center;
  margin-top: 10px;
`;

const LinkName = styled(Link)`
  text-decoration: none;
  color: black;
`;
