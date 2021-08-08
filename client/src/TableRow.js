import React from "react";
import styled from "styled-components";

const TableRow = ({ employeeData, selectedColumns }) => {
  return (
    <Wrapper>
      {selectedColumns.map((element) => {
        let returnText = employeeData[element];

        if (element === "salary") {
          returnText = "$" + Number(returnText).toLocaleString();
        }
        if (element === "Name") {
          returnText = employeeData.givenName + " " + employeeData.surname;
        }
        return <td style={{ padding: "10px" }}>{returnText}</td>;
      })}
    </Wrapper>
  );
};

export default TableRow;

const Wrapper = styled.tr``;
