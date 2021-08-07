import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "./CurrentUserContext";
import Sidebar from "./Sidebar";
import TableRow from "./TableRow";
import img1 from "./assets/man-briefcase.png";
import img2 from "./assets/workers.png";
import img3 from "./assets/employee-of-the-month.png";
import img4 from "./assets/team.png";

const People = ({ isShown, bgWord, setBgWord, setIsShown }) => {
  const { allEmployees } = useContext(UserContext);
  const [imgSrc, setImgSrc] = useState(img1);
  const [rows, setRows] = useState([]);
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

    allEmployees.forEach((employee) => {
      selectedColumns.forEach((header) => {
        rows[i].push(employee[header]);
      });
      i++;
    });
  }, [allEmployees]);

  return (
    <Wrapper>
      <Sidebar setIsShown={setIsShown} setBgWord={setBgWord} />
      <MainPageWrapper>
        <table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              {selectedColumns.map((element) => {
                let header = element;

                if (header === "directReports") {
                  header = "Direct Reports";
                }
                if (header === "reportsTo") {
                  header = "Line Manager";
                }
                header = header.charAt(0).toUpperCase() + header.slice(1);
                return <th>{header}</th>;
              })}
            </tr>
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
        <Image>
          <img
            src={imgSrc}
            alt="nothing-more-img"
            style={{ height: "100px", width: "100px" }}
          />
        </Image>
        {isShown && <BackGroundWord>{bgWord.toLowerCase()}.</BackGroundWord>}
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
  height: 90vh;
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
