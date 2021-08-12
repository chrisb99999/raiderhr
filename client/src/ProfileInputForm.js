import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";

const ProfileInputForm = () => {
  const { user } = useAuth0();
  const userEmail = user.email;
  const { currentUser, setUser, currentUserId } = useContext(UserContext);
  let history = useHistory();
  const [tempUserInfo, setTempUserInfo] = useState({
    givenName: "",
    surname: "",
    email: userEmail,
    title: "",
    role: "Admin",
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

  let buttonContent = "Save Changes";

  const handleSubmit = () => {
    buttonContent = "✓";
    setUser({
      ...currentUser,
      givenName: tempUserInfo.givenName,
      newUser: false,
    });

    fetch(`/api/editUser/${currentUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentUser, ...tempUserInfo, newUser: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
            placeholder={currentUser.givenName}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Family Name</Label>
          <Input
            name="surname"
            placeholder={currentUser.surname}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Email</Label>
          <Input disabled={true} value={user.email}></Input>
        </RowWrap>
        <RowWrap>
          <Label>Title</Label>
          <Input
            name="title"
            placeholder={currentUser.title}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Role</Label>
          <select
            id="role"
            name="role"
            style={{ width: "40%", height: "22px" }}
            onChange={handleInputChange}
            required={true}
            value="Admin"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </RowWrap>
        <RowWrap>
          <Label>Reports to:</Label>
          <Input
            name="reportsTo"
            placeholder={currentUser.reportsTo}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Team:</Label>
          <Input
            name="team"
            placeholder={currentUser.team}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Salary</Label>
          <Input
            name="salary"
            type="number"
            placeholder={currentUser.salary}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Address</Label>
          <Input
            name="address"
            placeholder={currentUser.address}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Country</Label>
          <Input
            name="country"
            placeholder={currentUser.country}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Postal Code</Label>
          <Input
            name="postalCode"
            placeholder={currentUser.postalCode}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Date of Birth</Label>
          <Input
            name="birthday"
            type="date"
            placeholder={currentUser.birthday}
            onChange={handleInputChange}
            required={true}
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
  padding: 20px;
  border-radius: 10px;
`;

const RowWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
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
