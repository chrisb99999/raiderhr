import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled, { keyframes } from "styled-components";
import Sidebar from "./Sidebar";
import AddUserForm from "./AddUserForm";
import NewCompanySetup from "./NewCompanySetup";
import { UserContext } from "./CurrentUserContext";
import tumble from "./assets/tumbleweed-colour.png";
import cricket from "./assets/cricket.png";
import { useHistory } from "react-router-dom";

const UserHomePage = ({ setIsShown, setBgWord, bgWord, isShown }) => {
  const [companyList, setCompanyList] = useState(null);
  const [newCo, setNewCo] = useState(null);
  const [addUsersClicked, setAddUsers] = useState(false);
  const [imgSrc, setimgSrc] = useState(true);
  let history = useHistory();
  const { user } = useAuth0();
  const email = user.email;
  const {
    currentUser,
    setUser,
    setCurrentUserId,
    setCompany,
    triggerUpdate,
    headcount,
    globalSalary,
    jobs,
  } = useContext(UserContext);

  // get the user company from the email address
  const userCompany = user.email.slice(
    user.email.indexOf("@") + 1,
    user.email.indexOf(".")
  );

  // sets random bg icon
  useEffect(() => {
    if (Math.random() > 0.5) {
      setimgSrc(tumble);
    } else {
      setimgSrc(cricket);
    }
  }, []);

  // gets list of companies to lookup user email domain against
  useEffect(() => {
    fetch("/api/companies")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCompanyList(data.result);
      });
  }, []);

  // defines whether users email domain is an existing company
  useEffect(() => {
    if (companyList) {
      setNewCo(companyList.includes(userCompany) ? false : true);
    }
    if (companyList?.includes(userCompany)) {
      setCompany(userCompany);
    }
  }, [companyList]);

  // gets user data and sets the current user
  useEffect(() => {
    fetch(`/api/userbyemail/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);

        data.user && setCurrentUserId(data.user._id);
      });
  }, [triggerUpdate]);

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
                  setAddUsers(!addUsersClicked);
                }}
              >
                Add users.
              </CalltoAction>
              {addUsersClicked && <AddUserForm setAddUsers={setAddUsers} />}
              <CalltoAction
                onClick={() => {
                  history.push("/people");
                }}
              >
                Summary: you have {headcount} employee(s). Your monthly cash
                burn on salaries is $
                {Number(globalSalary / 12).toLocaleString()}.{" "}
              </CalltoAction>
              {jobs && (
                <CalltoAction
                  onClick={() => {
                    history.push("/jobs");
                  }}
                >
                  You have {jobs.length} open job listings.
                </CalltoAction>
              )}
            </div>
          )}
          <Image>
            <img
              src={imgSrc}
              alt="nothing-more-img"
              style={{ height: "80px", width: "80px", marginTop: "20px" }}
            />
          </Image>
        </InternalWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffeed2"
            fill-opacity="1"
            d="M0,128L34.3,112C68.6,96,137,64,206,90.7C274.3,117,343,203,411,234.7C480,267,549,245,617,240C685.7,235,754,245,823,224C891.4,203,960,149,1029,138.7C1097.1,128,1166,160,1234,176C1302.9,192,1371,192,1406,192L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
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
  height: 100%;
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
