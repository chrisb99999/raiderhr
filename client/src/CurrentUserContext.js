import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allEmployees, setAllEmployees] = useState(null);
  const [headcount, setHeadcount] = useState(null);
  const [globalSalary, setGlobalSalary] = useState(null);
  const [triggerUpdate, setTrigger] = useState(false);
  const [triggerUser, setTriggerUser] = useState(false);
  const [triggerJobs, setTriggerJobs] = useState(false);

  useEffect(() => {
    fetch(`/api/usersbyco/${company}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setAllEmployees(data.result);
      });
  }, [currentUser, company, triggerUpdate]);

  useEffect(() => {
    async function fetchData() {
      let count = 0;
      let globalSalary = 0;
      await allEmployees?.forEach((element) => {
        count++;
        globalSalary = globalSalary + Number(element.salary);
      });
      setHeadcount(count);
      setGlobalSalary(globalSalary);
    }
    fetchData();
  }, [currentUser, company, allEmployees, triggerUpdate]);

  useEffect(() => {
    fetch("/api/getJobs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobs(data.result);
      });
  }, [currentUser, triggerJobs]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setUser,
        company,
        setCompany,
        currentUserId,
        setCurrentUserId,
        allEmployees,
        setAllEmployees,
        headcount,
        globalSalary,
        triggerUpdate,
        setTrigger,
        triggerUser,
        setTriggerUser,
        triggerJobs,
        setTriggerJobs,
        jobs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
