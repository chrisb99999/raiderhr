import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "./CurrentUserContext";

const NewCompanySetup = ({ userCompany }) => {
  const [coNameModal, setCoName] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [companyDoesNotExist, setCompanyDoesNotExist] = useState(true);
  const [companies, setCompanies] = useState(null);
  const { company, setCompany } = useContext(UserContext);
  const [render, setRender] = useState(false);

  let history = useHistory();

  const getText = (ev) => {
    setCompanyName(ev.target.value.toLowerCase());
  };

  const handleNewCompany = () => {
    fetch(`api/addCompany/${companyName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRender(!render);
      });
  };

  useEffect(() => {
    fetch("/api/companyList")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.companies[0].companies);
      });
  }, [coNameModal]);

  useEffect(() => {
    if (companies?.includes(userCompany)) {
      setCompanyDoesNotExist(false);
      setCompany(userCompany);
    }
  }, [companies]);

  console.log(companyName, userCompany, companies, company);
  return (
    <Wrapper>
      <Text>Looks like it's you're new here...</Text>
      <Text>Let's get you set-up.</Text>
      {!companyDoesNotExist && (
        <Text>
          👍 Great! You've added your company - why not add some other users and
          say hi to the rest of <strong>{userCompany}</strong>!
        </Text>
      )}
      {companyDoesNotExist && (
        <CalltoAction
          onClick={() => {
            setCoName((coNameModal) => !coNameModal);
          }}
        >
          Create your company.
        </CalltoAction>
      )}

      <CalltoAction
        onClick={() => {
          history.push("/profile");
        }}
      >
        Complete your profile.
      </CalltoAction>

      <CalltoAction
        onClick={() => {
          history.push("/people");
        }}
      >
        Add team members.
      </CalltoAction>

      {/* modals */}
      {coNameModal && (
        <Modal
          id="modal"
          isOpen={coNameModal}
          onClose={() => {
            setCoName(false);
            console.log("closing modal");
          }}
        >
          <Wrap>
            <ModalInput
              type="input"
              placeholder={userCompany}
              onChange={getText}
            ></ModalInput>
            <ModalSubmit type="button" onClick={handleNewCompany}>
              Create
            </ModalSubmit>
          </Wrap>
        </Modal>
      )}
    </Wrapper>
  );
};

export default NewCompanySetup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  margin-top: 10px;
`;

const CalltoAction = styled.button`
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid orange;
  height: 100px;
  background-color: #fcfcfc;

  &:hover {
    cursor: pointer;

    box-shadow: 0 0 0.15rem 0.075rem orange;
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalInput = styled.input`
  height: 30px;
  width: 70%;
  border: 1px solid black;
  border-radius: 5px;
`;

const ModalSubmit = styled.button`
  height: 30px;
  width: 20%;
  background-color: orange;
  color: black;
  box-shadow: 0px 0px 0px transparent;
  border: 1px solid black;
  border-radius: 5px;

  &:hover {
    cursor: pointer;

    box-shadow: 0 0 0.6rem 0.3rem orange;
  }
`;
