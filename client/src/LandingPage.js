import React from "react";
import styled, { keyframes } from "styled-components";
import pic from "./assets/annie-spratt-J67BWDuNq0U-unsplash.jpeg";
import marchingLead from "./assets/marching.png";
import marchingDrum from "./assets/marching-drum.png";
import marchingBass from "./assets/marching-bass-drum.png";
import goodFaces from "./assets/good-faces-mzN7eMmv9IM-unsplash.jpeg";
// import order from "./assets/jeff-frenette-Y_AWfh0kGT4-unsplash.jpeg";
import playmobile from "./assets/markus-spiske-qodjMu0byZ8-unsplash.jpeg";
import { FiChevronsDown } from "react-icons/fi";
import { Link } from "react-scroll";
import LoginButton from "./LoginButton";

const LandingPage = () => {
  console.log(window.pageYOffset);
  // // const direction = useRef(true);

  // useEffect(() => {
  //   setInterval(() => {
  //     direction.current = !direction;
  //   }, Math.random() * 1000);
  // }, []);
  return (
    <HomeWrap>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,96L21.8,85.3C43.6,75,87,53,131,69.3C174.5,85,218,139,262,181.3C305.5,224,349,256,393,240C436.4,224,480,160,524,144C567.3,128,611,160,655,192C698.2,224,742,256,785,240C829.1,224,873,160,916,128C960,96,1004,96,1047,85.3C1090.9,75,1135,53,1178,74.7C1221.8,96,1265,160,1309,208C1352.7,256,1396,288,1418,304L1440,320L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
        ></path>
      </svg> */}
      <Wrapper>
        <ImageWrap>
          <img
            alt="annie-spratt-unsplash"
            src={pic}
            // width="100%"
            height="900px"
            // object-fit="cover"
            position="absolute"
            bottom="0"
          />
        </ImageWrap>
        <SideTextWrap style={{ height: "900px" }}>
          <TextBox style={{ marginLeft: "20%" }}>
            <Text>HR. Simplified.</Text>
            <Text>For free.</Text>
            <Chevrons to="section-2" spy={true} smooth={true} duration={1000}>
              <FiChevronsDown
                style={{
                  marginTop: "50px",
                  marginLeft: "50%",
                  fontSize: "30px",
                }}
              />
            </Chevrons>
          </TextBox>
        </SideTextWrap>
      </Wrapper>
      <Wrapper id="section-2">
        <SideTextWrap style={{ width: "100%", height: "900px" }}>
          {/* <IconWrap>
            <Icon
              src={marchingLead}
              direction={direction}
              style={{ transform: direction ? "scaleX(1)" : "scaleX(-1)" }}
            ></Icon>
          </IconWrap> */}
          <TextBox style={{ width: "100%" }}>
            <Text style={{ textAlign: "center" }}>
              Whether you've already got an army of people...
            </Text>
            {/* <Text>For free.</Text> */}
            {/* <Chevrons>
              <FiChevronsDown
                style={{
                  marginTop: "50px",
                  marginLeft: "50%",
                  fontSize: "30px",
                }}
              />
            </Chevrons> */}
          </TextBox>
        </SideTextWrap>
        {/* <ImageWrap style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            alt="martin-ceralde-unsplash"
            src={wallStPic}
            height="900px"
            object-fit="cover"
            float="right"
          ></img>
        </ImageWrap> */}
      </Wrapper>
      <Wrapper id="section-3">
        <SideTextWrap>
          <TextBox style={{ marginLeft: "20%" }}>
            <Text>Or you're just starting out.</Text>
            {/* <Text></Text> */}
            {/* <Chevrons>
              <FiChevronsDown
                style={{
                  marginTop: "50px",
                  marginLeft: "50%",
                  fontSize: "30px",
                }}
              />
            </Chevrons> */}
          </TextBox>
        </SideTextWrap>
        <ImageWrap style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            alt="good-faces-unsplash"
            src={goodFaces}
            height="900px"
            object-fit="cover"
          ></img>
        </ImageWrap>
      </Wrapper>
      <Wrapper id="section-4">
        <SideTextWrap4>
          <TextBox
            style={{
              //   marginLeft: "0",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                position: "absolute",
                bottom: "-2120px",
                left: "10%",
              }}
            >
              RaiderHR can help keep things in order.
            </Text>

            {/* <Chevrons>
              <FiChevronsDown
                style={{
                  marginTop: "50px",
                  marginLeft: "50%",
                  fontSize: "30px",
                }}
              />
            </Chevrons> */}
          </TextBox>
          <div
            style={{
              position: "absolute",
              bottom: "-2100px",
              right: "10%",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              width: "200px",
            }}
          >
            <LoginButton style={{ width: "200px" }} />
          </div>
        </SideTextWrap4>
        {/* <ImageWrap style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            alt="markus-spiske-unsplash"
            src={order}
            height="900px"
            object-fit="cover"
          ></img>
        </ImageWrap> */}
      </Wrapper>
    </HomeWrap>
  );
};

export default LandingPage;

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Icon = styled.img`
  height: 30px;
  width: 30px;
`;

const HomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageWrap = styled.div`
  width: 50%;

  position: relative;
  overflow: hidden;
`;

const flashing = keyframes`
from { opacity: 1;} to {opacity: 0;}
`;

const SideTextWrap = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 50%;
  align-items: center;
`;

const SideTextWrap4 = styled.div`
  display: flex;

  align-items: center;
  width: 100%;
  height: 900px;
  object-fit: cover;
  background-image: url(${playmobile});
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.div`
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const Chevrons = styled(Link)`
  animation: ${flashing} 1.5s infinite;
`;
