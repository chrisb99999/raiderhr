import React, { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import styled, { keyframes } from "styled-components";
import { UserContext } from "./CurrentUserContext";

const AddJobs = ({ setIsShown, setBgWord, isShown, bgWord }) => {
  const [jobInfo, setJobInfo] = useState({});
  const [added, setAdded] = useState(false);
  const { currentUser, currentUserId, company } = useContext(UserContext);

  const handleInputChange = (ev) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    setJobInfo({
      ...jobInfo,
      [name]: value,
      jobCreator: currentUser,
      jobCreatorId: currentUserId,
      company: company,
      open: true,
    });
    console.log(jobInfo);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(jobInfo);
    await fetch("/api/addJob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobInfo),
    }).then((res) => res.json());
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
    document.getElementById("form").reset();
  };
  return (
    <Wrapper>
      {" "}
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        <header style={{ padding: "10px", fontSize: "20px" }}>
          Add a job.
        </header>
        <p style={{ padding: "10px" }}>
          Writing a job posting seems like something that should be
          straightforward and fairly easy. Describe the position, state the
          qualifications and salary expectations and you are done right? While
          this statement is somewhat true, it isn’t the whole story if you
          really want to attract the best candidates. Achieving that goal is
          another thing entirely. To attract the best candidates, you almost
          have to think of your job posting as an entrance test to a
          competition. You want to compete against all the other job postings
          out there that may be enticing to your ideal job candidate.
        </p>
        <Link href="https://hiring.monster.ca/employer-resources/recruiting-strategies/acquiring-job-candidates/writing-clear-and-meaninful-job-postings-canada/">
          Learn more about good job postings here, courtesy of Monster.ca.
        </Link>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            marginTop: "20px",
            padding: "10px",
          }}
          id="form"
        >
          <Label>Job Title</Label>
          <Input
            name="job-title"
            placeholder="Senior Engineer"
            required={true}
            onChange={handleInputChange}
          ></Input>
          <Label>Location</Label>
          <Input
            name="location"
            placeholder="Montreal"
            required={true}
            onChange={handleInputChange}
          ></Input>
          <Label>Team</Label>
          <Input
            name="team"
            placeholder="Engineering"
            required={true}
            onChange={handleInputChange}
          ></Input>
          <Label>About Company</Label>
          <Input
            style={{ height: "100px" }}
            name="about-company"
            placeholder="RaiderHR is the best company on earth!"
            required={true}
            onChange={handleInputChange}
          ></Input>
          <Label>Job Description</Label>
          <Input
            style={{ height: "100px" }}
            name="jd"
            placeholder="Work closely with key engineers to deliver the best engineering."
            required={true}
            onChange={handleInputChange}
          ></Input>
          <Label>Candidate Requirements</Label>
          <Input
            style={{ height: "100px" }}
            name="requirements"
            placeholder="5+ years of being awesome."
            required={true}
            onChange={handleInputChange}
          ></Input>
          <Label>Comp</Label>
          <Input
            name="comp"
            type="number"
            placeholder="200,000"
            required={true}
            onChange={handleInputChange}
          ></Input>
          <Label>Perks</Label>
          <Input
            style={{ height: "100px" }}
            name="perks"
            placeholder="ESOP + RRSP + Medical + 5 weeks vacation"
            required={true}
            onChange={handleInputChange}
          ></Input>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Submit onClick={handleSubmit}>Add job.</Submit>
            <p style={{ display: added ? "block" : "none", marginTop: "10px" }}>
              {" "}
              Job Added!
            </p>
          </div>
        </form>
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

export default AddJobs;

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
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
`;

const Input = styled.input`
  margin-top: 4px;

  &:active {
    box-shadow: 0 0 0.15rem 0.075rem orange;
  }
`;

const Submit = styled.button`
  margin-top: 10px;
  border: 2px black solid;
  color: black;
  background: orange;
  border-radius: 10px;
  width: 50%;
  height: 30px;

  &:hover {
    cursor: pointer;
  }
`;

const Link = styled.a`
  color: black;
  &:hover {
    cursor: pointer;
  }
  padding: 10px;
`;
