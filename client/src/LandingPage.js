import React from "react";
import styled, { keyframes } from "styled-components";
import pic from "./assets/annie-spratt-J67BWDuNq0U-unsplash.jpeg";
import wallStPic from "./assets/martin-ceralde-xceMsVvxcd4-unsplash.jpeg";
import goodFaces from "./assets/good-faces-mzN7eMmv9IM-unsplash.jpeg";
import order from "./assets/jeff-frenette-Y_AWfh0kGT4-unsplash.jpeg";
import { FiChevronsDown } from "react-icons/fi";
import { Link } from "react-scroll";
import LoginButton from "./LoginButton";

const LandingPage = () => {
  console.log(window.pageYOffset);

  return (
    <HomeWrap>
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
        <SideTextWrap style={{ width: "100%", height: "900px" }}>
          <TextBox
            style={{
              //   marginLeft: "0",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text style={{ textAlign: "center" }}>
              RaiderHR can help keep things in order.
            </Text>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "black",
                color: "white",
                borderRadius: "20px",
              }}
            >
              <LoginButton />
            </div>
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
  width: 50%;
  align-items: center;
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
