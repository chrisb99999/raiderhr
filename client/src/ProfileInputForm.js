import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./CurrentUserContext";

const ProfileInputForm = ({ setUserInfo, userInfo }) => {
  const { user } = useAuth0();
  const userEmail = user.email;
  const { setNewUser } = useContext(UserContext);

  const [tempUserInfo, setTempUserInfo] = useState({
    givenName: "",
    surname: "",
    email: userEmail,
    title: "",
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
    attachedDocs: {},
  });

  const handleInputChange = (ev) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;

    setTempUserInfo({ ...tempUserInfo, [name]: value });
  };
  console.log(tempUserInfo);
  let buttonContent = "Save Changes";

  const handleSubmit = () => {
    buttonContent = "✓";
    setUserInfo({ ...userInfo, tempUserInfo });
    setNewUser(false);
  };

  return (
    <Wrapper>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <RowWrap>
          <Label>Given Name</Label>
          <Input
            name="givenName"
            placeholder="Given Name"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Family Name</Label>
          <Input
            name="surname"
            placeholder="Family Name"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Email</Label>
          <Input
            placeholder="email@email.com"
            disabled={true}
            value={user.email}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Title</Label>
          <Input
            name="title"
            placeholder="Chief of Awesomeness"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Role</Label>
          <Input
            name="role"
            placeholder="User/Admin"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Reports to:</Label>
          <Input
            name="reportsTo"
            placeholder="The Board"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Salary</Label>
          <Input
            name="salary"
            type="number"
            placeholder="20,000"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Address</Label>
          <Input
            name="address"
            placeholder="123 Fake Street"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Country</Label>
          <Input
            name="country"
            placeholder="Canada"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Postal Code</Label>
          <Input
            name="postalCode"
            placeholder="H1H 1H1"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Date of Birth</Label>
          <Input
            name="birthday"
            type="date"
            placeholder="H1H 1H1"
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type="button" onClick={handleSubmit}>
            {buttonContent}
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ProfileInputForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  width: 40%;
`;

const Input = styled.input`
  width: 40%;
`;

const Button = styled.button`
  width: 20%;
  margin-top: 20px;
  background-color: black;
  color: white;
  border-radius: 10px;
  border: 1px black solid;
`;
