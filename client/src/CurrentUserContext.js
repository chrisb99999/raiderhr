import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [newUser, setNewUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setUser,
        company,
        setCompany,
        newUser,
        setNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
