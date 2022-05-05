import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';
import UploadPhoto from '../../components/UploadPhoto';
//import Gmap from '../../components/Gmap';

export default function Order() {

  return (
    <div>
      <CssBaseline />
      <MyAppBar/>
      {/* <Gmap /> */}
      <UploadPhoto />
    </div>
  );
}