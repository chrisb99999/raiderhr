import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ApplicationDetail from "./ApplicationDetail";
import Sidebar from "./Sidebar";
import imgSrc from "./assets/employee-of-the-month.png";
import { useParams } from "react-router-dom";

const Applications = ({ isShown, bgWord, setBgWord, setIsShown }) => {
  const { id } = useParams();
  const [applications, setApplications] = useState(null);
  const [job, setJob] = useState(null);

  console.log(id);

  useEffect(() => {
    fetch(`/api/applcations/byJobId/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApplications(data.result);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJob(data.result);
      });
  }, []);
  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        {applications &&
          job &&
          applications.map((application) => {
            return <ApplicationDetail application={application} job={job} />;
          })}
        <Image>
          <img
            src={imgSrc}
            alt="nothing-more-img"
            style={{ height: "80px", width: "80px", marginTop: "20px" }}
          />
        </Image>
        {isShown && <BackGroundWord>{bgWord.toLowerCase()}.</BackGroundWord>}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffeed2"
            fill-opacity="1"
            d="M0,320L30,272C60,224,120,128,180,90.7C240,53,300,75,360,122.7C420,171,480,245,540,256C600,267,660,213,720,202.7C780,192,840,224,900,224C960,224,1020,192,1080,186.7C1140,181,1200,203,1260,218.7C1320,235,1380,245,1410,250.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </MainPageWrapper>
    </Wrapper>
  );
};

export default Applications;

const Wrapper = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  height: 100%;
`;
const wordAnimation = keyframes`
 from {
  opacity 0;
} to {
  opacity 1;
}
from {
  right: 0px;
} to {
  right: 40px;
}
`;

const BackGroundWord = styled.div`
  position: absolute;
  right: 40px;
  bottom: 2px;
  font-size: 8em;
  font-family: "Special Elite";
  color: #d7d7d7;
  animation: ${wordAnimation} 1s;
`;

const MainPageWrapper = styled.div`
  width: 80%;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
  padding: 10px;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const Export = styled.a`
  text-decoration: none;
  color: black;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  border: 2px solid black;
  background-color: #ffeed2;
  font-size: 12px;
  font-family: "Lausanne300-Italic";
  &:hover {
    cursor: pointer;

    box-shadow: 0 0 0.15rem 0.075rem orange;
  }
`;

const Row = styled.tr`
  &:hover {
    font-weight: bold;
    color: #009879;
  }
`;
