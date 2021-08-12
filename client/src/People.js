import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "./CurrentUserContext";
import Sidebar from "./Sidebar";
import TableRow from "./TableRow";
import img1 from "./assets/man-briefcase.png";
import img2 from "./assets/workers.png";
import img3 from "./assets/employee-of-the-month.png";
import img4 from "./assets/team.png";
import { set } from "lodash";

const People = ({ isShown, bgWord, setBgWord, setIsShown }) => {
  const { allEmployees } = useContext(UserContext);
  const [imgSrc, setImgSrc] = useState(img1);
  const [csvRows, setRows] = useState(null);
  const [csvContent, setCsvContent] = useState(null);
  const [url, setcsvUrl] = useState(null);

  let rows = [];

  const [selectedColumns, setSelectedColumns] = useState([
    "Name",
    "email",
    "title",
    "role",
    "reportsTo",
    "team",
    "salary",
  ]);
  const images = [img1, img2, img3, img4];
  const options = [
    "Name",
    "email",
    "title",
    "role",
    "directReports",
    "reportsTo",
    "team",
    "salary",
    "address",
    "country",
    "postalCode",
    "birthday",
    "status",
  ];
  useEffect(() => {
    const num = Math.round(Math.random() * 3);
    setImgSrc(images[num]);
  }, []);

  useEffect(() => {
    rows[0] = [];
    selectedColumns.forEach((element) => {
      rows[0].push(element);
      console.log(rows);
    });

    let i = 1;

    allEmployees?.forEach((employee) => {
      rows[i] = [];
      selectedColumns.forEach((header) => {
        if (header === "Name") {
          rows[i].push(employee.givenName + " " + employee.surname);
        } else {
          rows[i].push(employee[header]);
        }
      });
      i++;
    });

    setRows(rows);
  }, [allEmployees]);

  useEffect(() => {
    setCsvContent(csvRows?.map((e) => e.join(",")).join("\n"));
  }, [csvRows]);

  useEffect(() => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    setcsvUrl(url);
  }, [csvContent]);
  console.group(csvContent);
  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        <table
          style={{
            textAlign: "center",
            border: "1px solid black",
            marginBottom: "20px",
            width: "100%",
            borderCollapse: "separate",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            borderSpacing: "0px",
          }}
        >
          <thead
            style={{
              background: "#ffb347",
              borderRadius: "0px",
            }}
          >
            <Row>
              {selectedColumns.map((element, index) => {
                let header = element;

                if (header === "directReports") {
                  header = "Direct Reports";
                }
                if (header === "reportsTo") {
                  header = "Line Manager";
                }
                header = header.charAt(0).toUpperCase() + header.slice(1);
                return (
                  <th
                    style={{
                      padding: "10px",
                      borderRadius:
                        index === 0
                          ? "10px 0 0 0"
                          : index === selectedColumns.length - 1
                          ? "0 10px 0 0"
                          : "0",
                    }}
                  >
                    {header}
                  </th>
                );
              })}
            </Row>
          </thead>
          <tbody>
            {allEmployees &&
              allEmployees.map((element) => {
                return (
                  <TableRow
                    employeeData={element}
                    selectedColumns={selectedColumns}
                  />
                );
              })}
          </tbody>
        </table>
        <Export href={url} download="myEmployees.csv">
          Export as csv
        </Export>
        <Image>
          <img
            src={imgSrc}
            alt="nothing-more-img"
            style={{
              height: "80px",
              width: "80px",
              marginTop: "10%",
              marginBottom: "50%",
            }}
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

export default People;

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
