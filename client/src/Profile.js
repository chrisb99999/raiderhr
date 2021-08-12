import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "./Sidebar";
import defaultUserPic from "./assets/user.png";
import { UserContext } from "./CurrentUserContext";
import missing from "./assets/missing.png";
import ProfileInputForm from "./ProfileInputForm";
import ProfileInfo from "./ProfileInfo";
import UserAvatar from "./UserAvatar";
import vacation from "./assets/vacation.png";
import airplane from "./assets/airplane.png";

const Profile = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  const {
    currentUser,
    setUser,
    currentUserId,
    allEmployees,
    triggerUser,
    setTriggerUser,
  } = useContext(UserContext);
  const [newU, setNewUser] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgUploadLink, setImgUploadLink] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    setNewUser(currentUser.newUser);
  }, []);

  const handleDrop = (ev) => {
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
    setTriggerUser(!triggerUser);
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
        <WrapProfileInner>
          {!newU && <ProfileInfo />}
          {!newU && (
            <ProfileSideInner>
              <VacationBooker>
                <Header>Book Vacation</Header>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                    paddingTop: "30px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                  }}
                >
                  <img
                    src={vacation}
                    alt="vacation-icon"
                    height="80px"
                    width="80px"
                    marginTop="10px"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <span>Days available: 15</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label style={{ marginBottom: "4px" }}>Book from</label>
                      <input
                        type="date"
                        name="vacationStart"
                        style={{ marginBottom: "10px" }}
                      ></input>
                      <label style={{ marginBottom: "4px" }}>Book to</label>
                      <input
                        type="date"
                        name="vacationEnd"
                        style={{ marginBottom: "10px" }}
                      ></input>
                    </form>
                  </div>
                  <div>
                    <VacationButton>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={airplane}
                          alt="submit-vacation"
                          style={{ height: "40px" }}
                        ></img>
                      </div>
                    </VacationButton>{" "}
                  </div>
                </div>
              </VacationBooker>
              <OtherEmployees>
                <Header>Your other employees</Header>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  {allEmployees && allEmployees.length === 1 && (
                    <img
                      src={missing}
                      alt="no employees"
                      style={{ height: "100px" }}
                    ></img>
                  )}
                  {allEmployees &&
                    allEmployees.map((element, index) => {
                      if (element.email === currentUser.email) {
                        return <></>;
                      } else if (index > 3) {
                        return <></>;
                      } else {
                        return <UserAvatar user={element} />;
                      }
                    })}
                </div>
              </OtherEmployees>
            </ProfileSideInner>
          )}
        </WrapProfileInner>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffeed2"
            fill-opacity="1"
            d="M0,96L21.8,85.3C43.6,75,87,53,131,69.3C174.5,85,218,139,262,181.3C305.5,224,349,256,393,240C436.4,224,480,160,524,144C567.3,128,611,160,655,192C698.2,224,742,256,785,240C829.1,224,873,160,916,128C960,96,1004,96,1047,85.3C1090.9,75,1135,53,1178,74.7C1221.8,96,1265,160,1309,208C1352.7,256,1396,288,1418,304L1440,320L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
          ></path>
        </svg>
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
  height: 100%;
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

const WrapProfileInner = styled.div`
  display: flex;
  flex-direction: row;
  height: 50%;
  margin-top: 30px;
`;

const ProfileSideInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const VacationBooker = styled.div`
  height: 50%;
  min-height: 190px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fcfcfc;
  border: 1px solid orange;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`;

const OtherEmployees = styled.div`
  height: 50%;
  min-height: 190px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fcfcfc;
  border: 1px solid orange;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const Header = styled.header`
  margin-bottom: 10px;
`;

const VacationButton = styled.button`
  border: 2px solid black;
  background: #ffeed2;
  border-radius: 10px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;
