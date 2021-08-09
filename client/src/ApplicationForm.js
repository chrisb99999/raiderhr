import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ApplicationForm = ({ job, setJobInfo, jobInfo }) => {
  const [resume, setResume] = useState(null);
  const [resumeUploadLink, setResumeUploadLink] = useState(null);
  const [resumeDownloadLink, setResumeDownloadLink] = useState(null);

  const handleResumeInput = (ev) => {
    setResume(ev.dataTransfer.files[0]);
  };

  const handleInputChange = (ev) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    setJobInfo({
      ...jobInfo,
      [name]: value,
    });
  };

  // update the link on the applicant profile
  const handleResumeUpload = () => {
    setJobInfo({
      ...jobInfo,
      resume: resumeUploadLink.split("?")[0],
    });
  };

  // Once you have the upload link, set the download link and then post download link to the db
  const handleGetUrl = () => {
    resumeUploadLink && setResumeDownloadLink(resumeUploadLink.split("?")[0]);
    resumeUploadLink && resume && handleResumeUpload();
  };

  // set the Upload link received below
  const handleUploadLink = async (data) => {
    setResumeUploadLink(data);
  };

  // get the upload link from S3/AWS
  useEffect(() => {
    resume &&
      fetch("/s3Url")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          handleUploadLink(data.url);
        });
  }, [resume]);

  // once there is a file and upload link, post the resume and set the download link
  useEffect(() => {
    async function fetchData() {
      resumeUploadLink &&
        resume &&
        (await fetch(resumeUploadLink, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },

          body: resume,
        }));
    }
    async function handleData() {
      await fetchData();
      resumeUploadLink && handleGetUrl();
    }

    handleData();
  }, [resume, resumeUploadLink]);
  return (
    <Wrapper>
      <Header>SUBMIT YOUR APPLICATION</Header>
      <Form id="app-form">
        <RowWrap>
          <Label>Name: </Label>
          <Input name="name" onChange={handleInputChange}></Input>
        </RowWrap>
        <RowWrap>
          <Label>Email: </Label>
          <Input name="email" type="email" onChange={handleInputChange}></Input>
        </RowWrap>
        <RowWrap>
          <Label>Phone: </Label>
          <Input name="phone" type="phone" onChange={handleInputChange}></Input>
        </RowWrap>
        <RowWrap>
          <Label>Add a one paragraph summary of your experience: </Label>
          <Input
            name="profile"
            style={{ height: "100px" }}
            onChange={handleInputChange}
          ></Input>
        </RowWrap>
        <RowWrap>
          <Label>Upload your resume: </Label>
          <Input name="resume" type="file" onChange={handleResumeInput}></Input>
        </RowWrap>
      </Form>
    </Wrapper>
  );
};

export default ApplicationForm;

const Header = styled.header`
  padding: 20px;
`;
const Wrapper = styled.div`
  width: 70%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const RowWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px;
`;
const Input = styled.input`
  width: 60%;
`;
const Label = styled.label`
  width: 30%;
`;
