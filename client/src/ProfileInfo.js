import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./CurrentUserContext";

const ProfileInfo = () => {
  const { currentUser } = useContext(UserContext);
  let formattedSalary = Number(currentUser.salary).toLocaleString();
  console.log(formattedSalary);
  return (
    <Wrapper>
      <ProfileItem>
        <div>
          <strong>First Name:</strong>
        </div>{" "}
        <div>{currentUser.givenName}</div>
      </ProfileItem>
      <ProfileItem>
        <div>
          <strong>Family Name:</strong>
        </div>{" "}
        {currentUser.surname}
      </ProfileItem>
      <ProfileItem>
        <div>
          <strong>Title:</strong>
        </div>{" "}
        {currentUser.title}
      </ProfileItem>
      <ProfileItem>
        <div>
          <strong>Reports to:</strong>{" "}
        </div>
        {currentUser.reportsTo}
      </ProfileItem>
      <ProfileItem>
        <div>
          <strong>Annual Salary:</strong>
        </div>{" "}
        ${formattedSalary}
      </ProfileItem>
      <ProfileItem>
        <div>
          <strong>Address:</strong>
        </div>{" "}
        {currentUser.address}
      </ProfileItem>
      <ProfileItem>
        <div>
          <strong>Postal Code:</strong>{" "}
        </div>
        {currentUser.postalCode}
      </ProfileItem>
      <ProfileItem>
        {" "}
        <div>
          <strong>Date of Birth:</strong>
        </div>{" "}
        {currentUser.birthday}
      </ProfileItem>
    </Wrapper>
  );
};

export default ProfileInfo;

const Wrapper = styled.div`
  margin-top: 10px;
  margin-left: 40px;
  margin-right: 40px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 35%;
  background-color: #fcfcfc;
  border: 1px solid orange;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;
const ProfileItem = styled.div`
  margin-top: 10px;

  margin-left: 20px;
  justify-content: space-between;
  width: 100%;
`;
