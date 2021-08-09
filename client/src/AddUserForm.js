import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import { init } from "emailjs-com";

const AddUserForm = ({ setAddUsers }) => {
  const { triggerUpdate, setTrigger, company, currentUser } =
    useContext(UserContext);
  init("user_I7X5djmfD17UTn3NgP4vE");
  const serviceId = "service_wmz3dud";
  const templateId = "template_aikbfjj";

  const [buttonContent, setButtonContent] = useState("Save Changes");

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
    let templateParams = {
      from_name: currentUser.givenName,
      to_name: tempUserInfo.givenName,
      message: `Hey! ${currentUser.givenName} just added you to ${company} on RaiderHR!`,
      to_email: tempUserInfo.email,
      reply_to: currentUser.email,
    };

    setAddUsers(false);
    setTrigger(!triggerUpdate);
    window.emailjs.send(serviceId, templateId, templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };

  const updateTemplate = () => {
    handleSubmission();
    history.push("/home");
  };
  const handleSubmit = async () => {
    setButtonContent("✓");
    console.log("handling submit");
    await fetch(`/api/addUser/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tempUserInfo, newUser: false }),
    })
      .then((res) => res.json())
      .then(() => updateTemplate());
  };

  return (
    <Wrapper>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RowWrap>
          <Label>Given Name</Label>
          <Input
            name="givenName"
            placeholder={tempUserInfo.givenName}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Family Name</Label>
          <Input
            name="surname"
            placeholder={tempUserInfo.surname}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Email</Label>
          <Input
            name="email"
            value={tempUserInfo.email}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Title</Label>
          <Input
            name="title"
            placeholder={tempUserInfo.title}
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
            value="User"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </RowWrap>
        <RowWrap>
          <Label>Reports to:</Label>
          <Input
            name="reportsTo"
            placeholder={tempUserInfo.reportsTo}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Team:</Label>
          <Input
            name="team"
            placeholder={tempUserInfo.team}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Salary</Label>
          <Input
            name="salary"
            type="number"
            placeholder={tempUserInfo.salary}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Address</Label>
          <Input
            name="address"
            placeholder={tempUserInfo.address}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Country</Label>
          <Input
            name="country"
            placeholder={tempUserInfo.country}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Postal Code</Label>
          <Input
            name="postalCode"
            placeholder={tempUserInfo.postalCode}
            onChange={handleInputChange}
            required={true}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Date of Birth</Label>
          <Input
            name="birthday"
            type="date"
            placeholder={tempUserInfo.birthday}
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

  &:hover {
    cursor: pointer;
  }
`;
