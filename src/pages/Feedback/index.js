import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Feedback() {
  return <div>
    <CssBaseline />
    <MyAppBar />
    <Box sx={{ display: 'flex', justifyContent: "center" }}>
      <Card sx={{ width: 700, mt: 10 }}>
        <CardContent>
          <Typography variant="h4" component="div">
            {window.location.search.slice(1)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </div>;
}