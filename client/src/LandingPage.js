import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import pic from "./assets/annie-spratt-J67BWDuNq0U-unsplash.jpeg";

import goodFaces from "./assets/good-faces-mzN7eMmv9IM-unsplash.jpeg";
import wave from "./assets/wave.svg";
import { FiChevronsDown } from "react-icons/fi";
import { Link } from "react-scroll";
import LoginButton from "./LoginButton";
import features from "./assets/product.png";
import secure from "./assets/padlock.png";
import supportChat from "./assets/message.png";
import integrated from "./assets/integration.png";
import save from "./assets/money-saving.png";
import feedback from "./assets/quotes_feedback.png";

const LandingPage = () => {
  const quotes = [
    "RaiderHR has saved my team so much time!",
    "We used to pay so much for our HRIS, RaiderHR is incredible value!",
    "Make the change to RaiderHR and don't look back.",
  ];
  const attribution = [
    "Ryan Gosling -- LaLaLand Inc",
    "Jake @ Chinatown",
    "Larry Page @ Google",
  ];
  const [count, setCount] = useState(0);
  const check = "✓ ";

  const changeCount = () => {
    console.log("Changing count", count);
    if (count === 2) {
      console.log("if");
      setCount(0);
    } else {
      console.log("else");
      setCount(count + 1);
    }
  };

  useEffect(() => {
    const change = setInterval(changeCount, 3000);
    return () => clearInterval(change);
  }, [count]);

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundImage: `url(${wave})`,
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: "7 0px",
          left: "60vh",
          zIndex: "-100",
        }}
      >
        {" "}
      </div>
      <HomeWrap>
        <Wrapper>
          <ImageWrap style={{ marginLeft: "200px" }}>
            <img
              alt="annie-spratt-unsplash"
              src={pic}
              height="600px"
              position="absolute"
              bottom="0"
            />
          </ImageWrap>
          <SideTextWrap
            style={{
              height: "680px",
              padding: "40px",
            }}
          >
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
        <Wrapper
          id="section-2"
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "400px",
            backgroundColor: "#f2f2f2",
          }}
        >
          <InfoIconWrap>
            <Icon src={secure}></Icon>
            <BlurbHeader>Secure</BlurbHeader>
            <Blurb>
              RaiderHR has SOC 2 Type 2 certification and is trusted by 1,000s
              of organizations worldwide!
            </Blurb>
          </InfoIconWrap>
          <InfoIconWrap>
            <Icon src={supportChat}></Icon>
            <BlurbHeader>Support 24/7</BlurbHeader>
            <Blurb>
              With support chat available 24/7, you can make sure things are
              always running smoothly.
            </Blurb>
          </InfoIconWrap>
          <InfoIconWrap>
            <Icon src={integrated}></Icon>
            <BlurbHeader>Integrated</BlurbHeader>
            <Blurb>
              RaiderHR is integrated with all of your favourite apps, so you
              never need to waste time copying data.
            </Blurb>
          </InfoIconWrap>
          <InfoIconWrap>
            <Icon src={save}></Icon>
            <BlurbHeader>Save Money, Save Time</BlurbHeader>
            <Blurb>
              Our simple interface means you can focus on running your business,
              not HR paper-pushing.
            </Blurb>
          </InfoIconWrap>
        </Wrapper>
        <Wrapper id="section-3">
          <SideTextWrap
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <header>Read our reviews</header>
            <QuoteBox>
              <img
                src={feedback}
                alt="quote icon"
                style={{ width: "70px" }}
              ></img>
              <QuoteWrapper>
                <Quote>"{quotes[count]}"</Quote>
                <Attribution>"{attribution[count]}"</Attribution>
                <BubbleWrap>
                  <Bubble
                    style={{
                      backgroundColor: count === 0 ? "orange" : undefined,
                    }}
                  />
                  <Bubble
                    style={{
                      backgroundColor: count === 1 ? "orange" : undefined,
                    }}
                  />
                  <Bubble
                    style={{
                      backgroundColor: count === 2 ? "orange" : undefined,
                    }}
                  />
                </BubbleWrap>
              </QuoteWrapper>
            </QuoteBox>
          </SideTextWrap>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <ImageWrap
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <img
                alt="good-faces-unsplash"
                src={goodFaces}
                height="600px"
                object-fit="cover"
              ></img>
            </ImageWrap>
          </div>
        </Wrapper>
        <Wrapper
          style={{
            display: "flex",
            height: "400px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#f2f2f2",
          }}
        >
          <img
            src={features}
            alt="features-icon"
            style={{ height: "80px", marginBottom: "20px" }}
          />
          <header style={{ padding: "20px" }}>Features:</header>
          <RowWrap>
            <Checkmark>✓ </Checkmark> <p>Track your payroll costs.</p>
          </RowWrap>
          <RowWrap>
            <Checkmark>✓ </Checkmark> CSV exports for your accountant.
          </RowWrap>
          <RowWrap>
            <Checkmark>✓ </Checkmark>Create new job listings.
          </RowWrap>
          <RowWrap>
            <Checkmark>✓ </Checkmark>One-click job offer interviews.
          </RowWrap>
          <RowWrap>
            <Checkmark>✓ </Checkmark>HelloSign integration for contract offers.
          </RowWrap>
        </Wrapper>
        <Wrapper id="section-5">
          <SideTextWrap4>
            <TextBox
              style={{
                //   marginLeft: "0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  marginBottom: "20px",
                }}
              >
                RaiderHR can help keep things in order. Absolutely free.
              </Text>
            </TextBox>

            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",

                  justifyContent: "flex-end",
                }}
              >
                <Bounce>👉</Bounce>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <LoginButton style={{ width: "100px" }} />
              </div>
            </div>
          </SideTextWrap4>
        </Wrapper>
      </HomeWrap>
    </>
  );
};

export default LandingPage;

const quoteAnimation = keyframes`
 from {
  opacity 1;
} to {
  opacity 0;
}

`;
const Attribution = styled.span`
  font-size: 12px;
  padding: 20px;
`;
const Quote = styled.div`
  padding-top: 20px;
  height: 50px;
  animation: ${quoteAnimation} 400ms;
`;
const QuoteBox = styled.div`
  border-radius: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 70%;
  height: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const QuoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Bubble = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 100%;
  background-color: #f2f2f2;
  transition: 400ms ease-in-out;
`;
const BubbleWrap = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-evenly;
  align-items: center;
  width: 100px;
`;

const InfoIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  min-width: 250px;
  height: 300px;
  &:hover {
    background-color: #ffeed2;
  }
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
`;

const BlurbHeader = styled.span`
  margin: 20px 0 20px 0;
  font-family: "Lausanne650";
`;
const Blurb = styled.div`
  max-width: 200px;
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
  width: 100%;
`;

const ImageWrap = styled.div`
  max-width: 500px;
  height: 600px;
  margin: 40px 40px 40px 40px;
  border-radius: 20px;

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
  justify-content: center;
`;

const SideTextWrap4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
  object-fit: cover;
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

const BounceAnimation = keyframes`
  0% { margin-right: 0; }
  50% { margin-right: 15px }
  100% { margin-right: 0 }
`;

const Bounce = styled.div`
  font-size: 2rem;
  animation: ${BounceAnimation} 0.5s linear infinite;
`;

const RowWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 350px;
`;

const Checkmark = styled.span`
  font-size: 20px;
  margin-right: 20px;
`;
