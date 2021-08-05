import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "./Sidebar";
import defaultUserPic from "./assets/user.png";
import { UserContext } from "./CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { uuid } from "uuid";
import ProfileInputForm from "./ProfileInputForm";
import ProfileInfo from "./ProfileInfo";

const Profile = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  const { currentUser, setUser, company, newUser } = useContext(UserContext);
  const { user } = useAuth0();
  const userEmail = user.email;
  const [userInfo, setUserInfo] = useState({
    givenName: "",
    surname: "",
    email: userEmail,
    title: "",
    // _id: uuid(),
    role: "",
    directReports: [],
    reportsTo: "",
    team: "",
    salary: 0,
    address: "",
    country: "",
    postalCode: "",
    birthday: new Date("00/12/31"),
    startDate: new Date("20/12/31"),
    status: "active",
    terminationDate: "n/a",
    avatarSrc: "",
    company: company,
    attachedDocs: {},
  });

  useEffect(() => {
    setUser({ ...currentUser, userInfo });
  }, [userInfo]);

  const handleDrop = (ev) => {
    console.log(ev);
    console.log(ev.dataTransfer.files);
    const profilePicUpload = ev.dataTransfer.files[0];
    console.log("dropped");
  };

  useEffect(() => {
    console.log("re-rendering");
  }, [newUser]);

  console.log(newUser);
  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        <ProfileHeader>
          <HeaderItem>Profile</HeaderItem>
          <HeaderItem>Documents</HeaderItem>
        </ProfileHeader>
        <FileDrop
          id="output"
          draggable="true"
          onDragEnter={(ev) => {
            document.getElementById("output").textContent = "";
            ev.stopPropagation();
            ev.preventDefault();
            console.log("dragenter");
          }}
          onDragOver={(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            console.log("dragover");
          }}
          onDrop={(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            console.log("drop");
            handleDrop(ev);
          }}
        >
          <img
            src={defaultUserPic}
            alt="default user pic"
            style={{ height: "90px" }}
          ></img>
        </FileDrop>
        Profile Page
        {newUser && (
          <ProfileInputForm setUserInfo={setUserInfo} userInfo={userInfo} />
        )}
        {!newUser && (
          <ProfileInfo setUserInfo={setUserInfo} userInfo={userInfo} />
        )}
      </MainPageWrapper>
      {isShown && <BackGroundWord>{bgWord.toLowerCase()}</BackGroundWord>}
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
const MainPageWrapper = styled.div`
  width: 80%;
  height: 90vh;
  background-color: white;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
  padding: 10px;
`;

const wordAnimation = keyframes`
 from {
  opacity 0;
} to {
  opacity 1;
}
`;

const ProfileHeader = styled.div`
  top: 0;
  margin: 0;
  height: 30px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const HeaderItem = styled.div`
  margin-right: 15px;
  font-family: "Lausanne650";
`;

const BackGroundWord = styled.div`
  position: absolute;
  right: 20px;
  bottom: 2px;
  font-size: 8em;
  font-family: "Lausanne650";
  color: #d7d7d7;
  animation: ${wordAnimation} 800ms;
`;

const FileDrop = styled.div`
  height: 100px;
  width: 100px;
  border: 2px black solid;
  border-radius: 100%;
  margin: 10px 10px 10px 10px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
