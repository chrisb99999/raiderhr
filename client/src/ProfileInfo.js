import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const ProfileInfo = ({ userInfo }) => {
  console.log(userInfo);
  return <Wrapper>ProfileInfo {userInfo.name}</Wrapper>;
};

export default ProfileInfo;

const Wrapper = styled.div``;
