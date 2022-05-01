import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {activateRequest} from '../../utils/requests'
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';

export default function Activate() {
  const [data, setData] = useState("Activating")
  const sendToken = () => {
    activateRequest(setData);
  }

  useEffect(sendToken, []);

  return <div>
    <CssBaseline />
    <MyAppBar/>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <h1>{data}</h1>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button href="/login" variant='contained' sx={{ margin: "10px" }}>Login</Button>
      <Button href='/' variant='contained' sx={{ margin: "10px" }}>Home</Button>
    </Box>
  </div>
}