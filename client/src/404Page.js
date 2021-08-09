import React, { useEffect } from "react";
import errorPic from "./assets/404-error.png";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  let history = useHistory();

  function redirect() {
    history.push("/");
  }

  useEffect(() => {
    setTimeout(() => {
      redirect();
    }, 2000);
  }, []);

  return (
    <Wrapper>
      <img src={errorPic} alt="404 Page Not Found" />

      <p>Redirecting...</p>
    </Wrapper>
  );
};

export default ErrorPage;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;
