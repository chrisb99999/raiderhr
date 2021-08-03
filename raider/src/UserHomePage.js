import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import NewCompanySetup from "./NewCompanySetup";

const UserHomePage = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  const [companyList, setCompanyList] = useState(null);
  const [newCo, setNewCo] = useState(null);
  const { user } = useAuth0();

  const userCompany = user.email.slice(
    user.email.indexOf("@") + 1,
    user.email.indexOf(".")
  );

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompanyList(data.result);
      });
  }, []);

  companyList && setNewCo(companyList.includes(userCompany) ? false : true);
  companyList &&
    console.log(userCompany, companyList, companyList.includes(userCompany));

  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        Welcome {user.given_name}!{newCo && <NewCompanySetup />}
      </MainPageWrapper>
      {isShown && <BackGroundWord>{bgWord.toUpperCase()}</BackGroundWord>}
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
const BackGroundWord = styled.div`
  position: absolute;
  right: 20px;
  bottom: 2px;
  font-size: 8em;
  font-family: "Lausanne650";
  color: #d7d7d7;
  transition: 0.3s ease-in-out;
`;
