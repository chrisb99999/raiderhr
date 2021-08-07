import React from "react";
import styled from "styled-components";

const TableRow = ({ employeeData, selectedColumns }) => {
  return (
    <Wrapper>
      {selectedColumns.map((element) => {
        let returnText = employeeData[element];
        console.log(returnText);
        if (element === "salary") {
          returnText = "$" + Number(returnText).toLocaleString();
        }
        if (element === "Name") {
          returnText = employeeData.givenName + " " + employeeData.surname;
        }
        return <td>{returnText}</td>;
      })}
    </Wrapper>
  );
};

export default TableRow;

const Wrapper = styled.tr``;
