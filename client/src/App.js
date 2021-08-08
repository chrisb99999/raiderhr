import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import LandingPage from "./LandingPage";
import { useAuth0 } from "@auth0/auth0-react";
import UserHomePage from "./UserHomePage";
import ErrorPage from "./404Page";
import People from "./People";
import Profile from "./Profile";
import Jobs from "./Jobs";
import AddJobs from "./AddJobs";
import Applications from "./Applications";

import JobListing from "./JobListing";

function App() {
  const { isAuthenticated } = useAuth0();
  const [isShown, setIsShown] = useState(false);
  const [bgWord, setBgWord] = useState("");

  return (
    <BrowserRouter>
      <GlobalStyles />

      <Switch>
        <Route exact path="/">
          {isAuthenticated && (
            <>
              <Header />
              <UserHomePage
                setIsShown={setIsShown}
                setBgWord={setBgWord}
                bgWord={bgWord}
                isShown={isShown}
              />
            </>
          )}
          {!isAuthenticated && <LandingPage />}
        </Route>

        {isAuthenticated && (
          <Route exact path="/home">
            <>
              <Header />
              <UserHomePage
                setIsShown={setIsShown}
                setBgWord={setBgWord}
                bgWord={bgWord}
                isShown={isShown}
              />
            </>
          </Route>
        )}
        {isAuthenticated && (
          <Route exact path="/people">
            <>
              <Header />
              <People
                setIsShown={setIsShown}
                setBgWord={setBgWord}
                bgWord={bgWord}
                isShown={isShown}
              />
            </>
          </Route>
        )}
        {isAuthenticated && (
          <Route exact path="/profile">
            <>
              <Header />
              <Profile
                setIsShown={setIsShown}
                setBgWord={setBgWord}
                bgWord={bgWord}
                isShown={isShown}
              />
            </>
          </Route>
        )}
        {isAuthenticated && (
          <Route exact path="/jobs">
            <>
              <Header />
              <Jobs
                setIsShown={setIsShown}
                setBgWord={setBgWord}
                bgWord={bgWord}
                isShown={isShown}
              />
            </>
          </Route>
        )}
        {isAuthenticated && (
          <Route path="/addjobs">
            <>
              <Header />
              <AddJobs
                setIsShown={setIsShown}
                setBgWord={setBgWord}
                bgWord={bgWord}
                isShown={isShown}
              />
            </>
          </Route>
        )}
        {isAuthenticated && (
          <Route path="/jobApps/:id">
            <>
              <Header />
              <Applications
                setIsShown={setIsShown}
                setBgWord={setBgWord}
                bgWord={bgWord}
                isShown={isShown}
              />
            </>
          </Route>
        )}

        <Route exact path="/job/:id">
          <JobListing />
        </Route>

        <Route path="">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
