import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";

const AddUserForm = ({ setAddUsers }) => {
  const { user } = useAuth0();
  const userEmail = user.email;
  const [buttonContent, setButtonContent] = useState("Save Changes");
  const { triggerUpdate, setTrigger, company } = useContext(UserContext);
  let history = useHistory();
  const [tempUserInfo, setTempUserInfo] = useState({
    givenName: "",
    surname: "",
    email: "",
    title: "",
    role: "User",
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
    company: company,
  });

  const handleInputChange = (ev) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;

    setTempUserInfo({ ...tempUserInfo, [name]: value });
  };

  const handleSubmission = () => {
    setAddUsers(false);
    setTrigger(!triggerUpdate);
  };
  const handleSubmit = () => {
    setButtonContent("✓");
    console.log("handling submit");
    fetch(`/api/addUser/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tempUserInfo, newUser: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleSubmission();
        history.push("/home");
      });
  };

  return (
    <Wrapper>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <RowWrap>
          <Label>Given Name</Label>
          <Input
            name="givenName"
            placeholder={tempUserInfo.givenName}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Family Name</Label>
          <Input
            name="surname"
            placeholder={tempUserInfo.surname}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Email</Label>
          <Input
            name="email"
            value={tempUserInfo.email}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Title</Label>
          <Input
            name="title"
            placeholder={tempUserInfo.title}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Role</Label>
          <Input
            name="role"
            value={tempUserInfo.role}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Reports to:</Label>
          <Input
            name="reportsTo"
            placeholder={tempUserInfo.reportsTo}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Team:</Label>
          <Input
            name="team"
            placeholder={tempUserInfo.team}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Salary</Label>
          <Input
            name="salary"
            type="number"
            placeholder={tempUserInfo.salary}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Address</Label>
          <Input
            name="address"
            placeholder={tempUserInfo.address}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Country</Label>
          <Input
            name="country"
            placeholder={tempUserInfo.country}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Postal Code</Label>
          <Input
            name="postalCode"
            placeholder={tempUserInfo.postalCode}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Date of Birth</Label>
          <Input
            name="birthday"
            type="date"
            placeholder={tempUserInfo.birthday}
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

export default AddUserForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
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

  &:hover {
    cursor: pointer;
  }
`;
