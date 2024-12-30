// Click Counter Context
import React, { useState, useEffect,createContext, useContext  } from 'react';
export const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);

  const incrementCount = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <ClickContext.Provider value={{ clickCount, incrementCount }}>
      {children}
    </ClickContext.Provider>
  );
};

export const useClicks = () => {
  const context = useContext(ClickContext);
  if (!context) {
    throw new Error('useClicks must be used within a ClickProvider');
  }
  return context;
};
