import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled, { keyframes } from "styled-components";
import Sidebar from "./Sidebar";
import AddUserForm from "./AddUserForm";
import NewCompanySetup from "./NewCompanySetup";
import { UserContext } from "./CurrentUserContext";
import tumble from "./assets/tumbleweed-colour.png";
import cricket from "./assets/cricket.png";

const UserHomePage = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  const [companyList, setCompanyList] = useState(null);
  const [newCo, setNewCo] = useState(null);
  const [addUsersClicked, setAddUsers] = useState(false);
  const [imgSrc, setimgSrc] = useState(true);
  const { user } = useAuth0();
  const email = user.email;
  const {
    currentUser,
    setUser,
    setCurrentUserId,
    setCompany,
    allEmployees,
    headcount,
    globalSalary,
  } = useContext(UserContext);

  const userCompany = user.email.slice(
    user.email.indexOf("@") + 1,
    user.email.indexOf(".")
  );

  useEffect(() => {
    if (Math.random() > 0.5) {
      setimgSrc(tumble);
    } else {
      setimgSrc(cricket);
    }
  }, []);

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCompanyList(data.result);
      });
  }, []);

  useEffect(() => {
    if (companyList) {
      setNewCo(companyList.includes(userCompany) ? false : true);
    }
    if (companyList?.includes(userCompany)) {
      setCompany(userCompany);
    }
  }, [companyList]);

  useEffect(() => {
    fetch(`/api/userbyemail/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);

        data.user && setCurrentUserId(data.user._id);
      });
  }, []);

  console.log(allEmployees);

  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        <InternalWrapper>
          <p> 👋 Welcome {currentUser?.givenName}! </p>
          {newCo && <NewCompanySetup userCompany={userCompany} />}
          {!newCo && (
            <div style={{ width: "100%" }}>
              <p style={{ marginTop: "10px" }}>
                {" "}
                Here are some things that might need your attention:{" "}
              </p>

              <CalltoAction
                onClick={() => {
                  setAddUsers(true);
                  console.log("click!");
                }}
              >
                Add users.
              </CalltoAction>
              {addUsersClicked && <AddUserForm setAddUsers={setAddUsers} />}
              <CalltoAction>
                Summary: you have {headcount} employee(s). Your monthly cash
                burn on salaries is $
                {Number(globalSalary / 12).toLocaleString()}.{" "}
              </CalltoAction>
            </div>
          )}
          <Image>
            <img
              src={imgSrc}
              alt="nothing-more-img"
              style={{ height: "100px", width: "100px" }}
            />
          </Image>
        </InternalWrapper>
      </MainPageWrapper>

      {isShown && (
        <BackGroundWord id="bgword">{bgWord.toLowerCase()}.</BackGroundWord>
      )}
    </Wrapper>
  );
};

export default UserHomePage;

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

const InternalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const Image = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const CalltoAction = styled.button`
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid orange;
  height: 100px;
  background-color: #fcfcfc;
  width: 100%;
  &:hover {
    cursor: pointer;

    box-shadow: 0 0 0.15rem 0.075rem orange;
  }
`;
