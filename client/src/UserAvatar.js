import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import defaultUserPic from "./assets/user.png";

const UserAvatar = ({ user }) => {
  let link = "/";
  const src =
    user.avatarSrc.length > 0 ? user.avatarSrc.length : defaultUserPic;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        marginBottom: "10px",
      }}
    >
      <Wrapper>
        <img
          src={src}
          alt="userpic"
          style={{
            height: user.avatarSrc.length > 0 ? "100px" : "90px",
          }}
        ></img>
      </Wrapper>
      <NameWrap>{user.givenName}</NameWrap>
    </div>
  );
};

export default UserAvatar;

const Wrapper = styled.a`
  border-radius: 100%;
  height: 100px;
  width: 100px;
  margin: 10px 10px 10px 10px;
  border: 2px black solid;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &:hover {
    cursor: pointer;

    box-shadow: 0 0 0.3rem 0.15rem orange;
  }
`;

const NameWrap = styled.div``;
