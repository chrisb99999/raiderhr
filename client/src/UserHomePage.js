import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled, { keyframes } from "styled-components";
import Sidebar from "./Sidebar";
import NewCompanySetup from "./NewCompanySetup";
import { UserContext } from "./CurrentUserContext";

const UserHomePage = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  const [companyList, setCompanyList] = useState(null);
  const [newCo, setNewCo] = useState(null);
  const { user } = useAuth0();
  const { currentUser, setUser, setNewUser } = useContext(UserContext);

  const userCompany = user.email.slice(
    user.email.indexOf("@") + 1,
    user.email.indexOf(".")
  );

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
  }, [companyList]);

  useEffect(() => {}, []);

  console.log(companyList);

  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        👋 Welcome {user.given_name}!{" "}
        {newCo && <NewCompanySetup userCompany={userCompany} />}
      </MainPageWrapper>
      {isShown && (
        <BackGroundWord id="bgword">{bgWord.toLowerCase()}</BackGroundWord>
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

const wordAnimation = keyframes`
 from {
  opacity 0;
} to {
  opacity 1;
}
from {
  right: 0px;
} to {
  right: 20px;
}
`;

const BackGroundWord = styled.div`
  position: absolute;
  right: 20px;
  bottom: 2px;
  font-size: 8em;
  font-family: "Lausanne650";
  color: #d7d7d7;
  animation: ${wordAnimation} 1s;
`;
