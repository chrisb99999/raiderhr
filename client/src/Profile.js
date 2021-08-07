import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "./Sidebar";
import defaultUserPic from "./assets/user.png";
import { UserContext } from "./CurrentUserContext";

import ProfileInputForm from "./ProfileInputForm";
import ProfileInfo from "./ProfileInfo";

const Profile = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  const { currentUser, setUser, currentUserId } = useContext(UserContext);
  const [newU, setNewUser] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgUploadLink, setImgUploadLink] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    setNewUser(currentUser.newUser);
  }, []);

  const handleDrop = (ev) => {
    console.log(ev);
    console.log(ev.dataTransfer.files);
    setImgFile(ev.dataTransfer.files[0]);
    console.log("dropped");
  };

  useEffect(() => {
    console.log("re-rendering");
  }, [newU]);

  const handleImgUpload = () => {
    console.log("handling upload");
    setUser({ ...currentUser, avatarSrc: imgUploadLink.split("?")[0] });
    fetch(`/api/editUser/${currentUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...currentUser,
        avatarSrc: imgUploadLink.split("?")[0],
      }),
    }).then(console.log("uploaded"));
  };

  const handleGetUrl = () => {
    imgUploadLink && setImgUrl(imgUploadLink.split("?")[0]);
    console.log("handleGetUser");
    imgUploadLink && imgFile && handleImgUpload();
  };

  const handleUploadLink = async (data) => {
    setImgUploadLink(data);
  };

  useEffect(() => {
    imgFile &&
      fetch("/s3Url")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          handleUploadLink(data.url);
        });
  }, [imgFile]);

  useEffect(() => {
    async function fetchData() {
      imgUploadLink &&
        imgFile &&
        (await fetch(imgUploadLink, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },

          body: imgFile,
        }));
    }
    async function handleData() {
      await fetchData();
      imgUploadLink && handleGetUrl();
    }

    handleData();
  }, [imgFile]);

  console.log(currentUser.avatarSrc.length);

  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        <ProfileHeader>
          <HeaderItem>Profile</HeaderItem>
          <HeaderItem>Documents</HeaderItem>
        </ProfileHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FileDrop
            draggable="true"
            onDragEnter={(ev) => {
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
              src={
                currentUser.avatarSrc.length > 0
                  ? currentUser.avatarSrc
                  : defaultUserPic
              }
              alt="default user pic"
              style={{
                height: currentUser.avatarSrc.length > 0 ? "100px" : "90px",
              }}
            ></img>
          </FileDrop>
          <Name>{currentUser.givenName}</Name>
        </div>

        {newU && <ProfileInputForm />}
        {!newU && <ProfileInfo />}
      </MainPageWrapper>
      {isShown && <BackGroundWord>{bgWord.toLowerCase()}.</BackGroundWord>}
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

const wordAnimation = keyframes`
 from {
  opacity 0;
} to {
  opacity 1;
}
from {
  right: 0px;
} to {
  right: 40px;
}
`;

const BackGroundWord = styled.div`
  position: absolute;
  right: 40px;
  bottom: 2px;
  font-size: 8em;
  font-family: "Special Elite";
  color: #d7d7d7;
  animation: ${wordAnimation} 1s;
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

const Name = styled.div`
  font-family: "Special Elite";
  font-size: 3em;
  margin-left: 30px;
`;
