import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ApplicationForm from "./ApplicationForm";

const JobListing = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [salary, setSalary] = useState(null);
  const [apply, setApply] = useState(false);
  const [appInfo, setJobInfo] = useState(null);
  const [applied, setApplied] = useState(false);

  console.log(id);

  const setItems = (job) => {
    console.log(job);
    setJob(job);
    setSalary(Number(job.comp).toLocaleString());
    setJobInfo({ jobId: id });
  };
  useEffect(() => {
    fetch(`/api/job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.result);
      });
  }, []);

  const handleClick = () => {
    setApply(true);
  };

  const handleSubmit = () => {
    fetch(`/api/jobApplication/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appInfo),
    });

    document.getElementById("app-form").reset();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setApply(false);
    }, 2000);
  };

  return (
    <Wrapper>
      {job && (
        <>
          <Header>
            <HeaderWrap>
              {job["job-title"]} @ {job.company}{" "}
              <div style={{ fontSize: "20px", marginTop: "15px" }}>
                {job.location}
              </div>
            </HeaderWrap>
          </Header>

          <InternalWrap>
            {!apply && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#ffeed2"
                    fill-opacity="1"
                    d="M0,256L18.5,245.3C36.9,235,74,213,111,218.7C147.7,224,185,256,222,234.7C258.5,213,295,139,332,101.3C369.2,64,406,64,443,74.7C480,85,517,107,554,112C590.8,117,628,107,665,122.7C701.5,139,738,181,775,192C812.3,203,849,181,886,186.7C923.1,192,960,224,997,229.3C1033.8,235,1071,213,1108,218.7C1144.6,224,1182,256,1218,277.3C1255.4,299,1292,309,1329,304C1366.2,299,1403,277,1422,266.7L1440,256L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"
                  ></path>
                </svg>
                <div
                  style={{
                    position: "relative",
                    transform: "translateY(-40%)",
                    padding: "20px",
                  }}
                >
                  <JDSection>
                    <h4 style={{ marginBottom: "15px" }}>
                      About {job.company}
                    </h4>
                    <p>{job["about-company"]}</p>
                  </JDSection>
                  <JDSection>
                    <h4 style={{ marginBottom: "15px" }}>The Role: </h4>
                    <p>{job["jd"]}</p>
                  </JDSection>
                  <JDSection>
                    <h4 style={{ marginBottom: "15px" }}>About You: </h4>
                    <p>{job["requirements"]}</p>
                  </JDSection>
                  <JDSection>
                    <h4 style={{ marginBottom: "15px" }}>What we offer: </h4>
                    <p>{job["perks"]}</p>
                  </JDSection>
                  <JDSection>
                    <h4 style={{ marginBottom: "15px" }}>Salary: </h4>
                    <p>Up to ${salary}</p>
                  </JDSection>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <ApplyButton onClick={handleClick}>APPLY</ApplyButton>
                    <div
                      style={{ fontFamily: "Special Elite", marginTop: "40px" }}
                    >
                      powered by raiderhr.
                    </div>
                  </div>
                </div>{" "}
              </>
            )}

            {apply && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ApplicationForm
                  job={job}
                  setJobInfo={setJobInfo}
                  jobInfo={appInfo}
                />
                <ApplyButton onClick={handleSubmit}>
                  SUBMIT APPLICATION
                </ApplyButton>
                {applied && (
                  <div style={{ padding: "20px" }}>Application submitted!</div>
                )}
                <div style={{ fontFamily: "Special Elite", marginTop: "40px" }}>
                  powered by raiderhr.
                </div>
              </div>
            )}
          </InternalWrap>
        </>
      )}
    </Wrapper>
  );
};

export default JobListing;

const Wrapper = styled.div`
  background: #f2f2f2;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.header`
  background: white;
  height: 200px;
  width: 100vw;
  color: black;
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const InternalWrap = styled.div`
  height: 100%;
  margin-right: 15%;
  margin-left: 15%;
  display: flex;
  flex-direction: column;
  padding-top: 0;
  padding-left: 20px;
`;

const HeaderWrap = styled.div`
  height: 100%;
  margin-right: 15%;
  margin-left: 15%;
  font-size: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JDSection = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ApplyButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: 2px black solid;
  background: orange;
  color: black;
  width: 30%;
  &:hover {
    cursor: pointer;
  }
`;
