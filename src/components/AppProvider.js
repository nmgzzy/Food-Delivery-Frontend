import React from "react"
import { UserProvider } from "./UserContext"
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme';

export  const AppProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>
    <UserProvider>
      {children}
    </UserProvider>
  </ThemeProvider>
};

