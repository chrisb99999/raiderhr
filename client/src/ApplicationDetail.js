import React, { useContext, useState } from "react";
import { init } from "emailjs-com";
import styled from "styled-components";
import { UserContext } from "./CurrentUserContext";

const ApplicationDetail = ({ application, job }) => {
  const { currentUser, company } = useContext(UserContext);
  init("user_I7X5djmfD17UTn3NgP4vE");
  const serviceId = "service_wmz3dud";
  const templateId = "template_c7v1a8x";

  const [buttonContent, setButtonContent] = useState("Offer Interview");
  const [jobbuttonContent, setJobButtonContent] = useState(
    "Send Offer and Contract"
  );

  const handleOfferInterview = () => {
    let templateParams = {
      from_name: currentUser.givenName,
      to_name: application.name,
      message: `Congratulations! We loved your profile and would like to offeer you an interview at ${company} for the ${job["job-title"]} position.`,
      to_email: application.email,
      reply_to: currentUser.email,
      job_title: job["job-title"],
    };

    setButtonContent("✓ - Interview email sent");

    window.emailjs.send(serviceId, templateId, templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };

  const handleContractSend = () => {
    fetch("/api/application/offer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: application.email,
        name: application.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobButtonContent("✓ - Contract sent");
      });
  };
  return (
    <Wrapper>
      <Title>
        <JobInfo>
          <strong> Role: {job["job-title"]}</strong> ({job["location"]})
        </JobInfo>
      </Title>

      <InfoWrap>
        <ApplicantInfo>Applicant: {application.name}</ApplicantInfo>
        <Line />
        <Profile>Profile: {application.profile} </Profile>
        <Profile>Email: {application.email} </Profile>
      </InfoWrap>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Offer onClick={handleContractSend}>{jobbuttonContent}</Offer>
        <Offer onClick={handleOfferInterview}>{buttonContent}</Offer>
      </div>
    </Wrapper>
  );
};

export default ApplicationDetail;

const Wrapper = styled.div`
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 10px;
  border: 1px solid orange;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 7px;
`;
const InfoWrap = styled.div`
  padding: 10px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;
const Title = styled.header`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const JobInfo = styled.div`
  margin-left: 10px;
`;
const ApplicantInfo = styled.div`
  font-family: "Lausanne300-Italic";
  margin-bottom: 2px;
`;

const Profile = styled.div`
  padding: 5px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  border-bottom: solid 1px black;
  margin-bottom: 8px;
`;

const Offer = styled.button`
  border-radius: 10px;
  border: 2px solid black;
  background: #ffeed2;
  padding: 10px;
  text-align: center;
  width: 15%;
  margin: 0 10px 10px 10px;

  &:hover {
    cursor: pointer;
  }
`;
