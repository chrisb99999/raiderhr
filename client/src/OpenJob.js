import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const OpenJob = ({ job }) => {
  const salary = Number(job.comp).toLocaleString();
  let history = useHistory();
  const handleClick = () => {
    history.push(`/jobApps/${job._id}`);
  };
  const handleLive = () => {
    history.push(`/job/${job._id}`);
  };
  return (
    <Wrapper>
      <Title>
        {job["job-title"]} - {job["location"]}
      </Title>
      <InfoWrap>
        <JobInfo>{job["jd"]}</JobInfo>
        <JobInfo>{job["requirements"]}</JobInfo>
        <JobInfo>{job["team"]}</JobInfo>
        <JobInfo>${salary}</JobInfo>
        <JobInfo>{job["perks"]}</JobInfo>
      </InfoWrap>
      <JobCreator>Created by: {job["jobCreator"]["email"]}</JobCreator>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Review onClick={handleLive}>See Live Listing</Review>
        <Review onClick={handleClick}>See Applications</Review>
      </div>
    </Wrapper>
  );
};

export default OpenJob;

const Wrapper = styled.div`
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 10px;
  border: 1px solid orange;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.header`
  margin-bottom: 10px;
`;

const InfoWrap = styled.div`
  padding: 10px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;
const JobInfo = styled.div``;

const JobCreator = styled.div`
  font-family: "Lausanne300-Italic";
  font-size: 12px;
  text-align: right;
`;

const Review = styled.button`
  border-radius: 10px;
  border: 2px solid black;
  background: #ffeed2;
  padding: 10px;
  text-align: center;
  width: 15%;
  margin-top: 10px;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;
