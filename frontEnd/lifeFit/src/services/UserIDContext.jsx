import React, { createContext, useContext, useState } from "react";

// Criação do contexto
const UserIdContext = createContext();

// Hook customizado para acessar o contexto
export const useUserId = () => useContext(UserIdContext);

// Provider para envolver os componentes
export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
