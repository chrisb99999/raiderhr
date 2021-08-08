import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styled, { keyframes } from "styled-components";
import tumble from "./assets/tumbleweed-colour.png";
import cricket from "./assets/cricket.png";
import CalltoAction from "./CallToAction";
import { useHistory } from "react-router-dom";
import { UserContext } from "./CurrentUserContext";
import OpenJob from "./OpenJob";

const Jobs = ({ setIsShown, setBgWord, isShown, bgWord }) => {
  const [imgSrc, setimgSrc] = useState(true);
  const { jobs, setTriggerJobs, triggerJobs } = useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    if (Math.random() > 0.5) {
      setimgSrc(tumble);
    } else {
      setimgSrc(cricket);
    }
  }, []);

  const click = () => {
    history.push("/addjobs");
    setTriggerJobs(!triggerJobs);
  };

  return (
    <Wrapper>
      {" "}
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        {jobs && (
          <header style={{ marginBottom: "10px" }}>Current Job Listings</header>
        )}
        {jobs &&
          jobs.map((element) => {
            if (element.open === true) {
              return <OpenJob job={element} />;
            } else {
              return <></>;
            }
          })}
        <CalltoAction
          text={"Add a job opening."}
          onClickFunction={click}
        ></CalltoAction>
        <Image>
          <img
            src={imgSrc}
            alt="nothing-more-img"
            style={{ height: "100px", width: "100px" }}
          />
        </Image>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffeed2"
            fill-opacity="1"
            d="M0,128L48,106.7C96,85,192,43,288,37.3C384,32,480,64,576,112C672,160,768,224,864,245.3C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </MainPageWrapper>
      {isShown && <BackGroundWord>{bgWord.toLowerCase()}.</BackGroundWord>}
    </Wrapper>
  );
};

export default Jobs;

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
