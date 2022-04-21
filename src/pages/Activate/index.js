import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Activate() {
    const [data, setData] = useState("Activating")
    const sendToken = () => {
        axios.get('https://fd.shimonzhan.com/api/user/activate'+window.location.search)
        .then(function (res) {
            console.log(res);
            setData(res.data.message)
        })
        .catch(function (err) {
            console.log(err);
            setData(err.data.message)
        });
    }

    useEffect(sendToken, []);

    return <div>
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <h1>{data}</h1>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Button href="/login" variant='contained' sx={{margin:"10px"}}>Login</Button>
            <Button href='/' variant='contained' sx={{margin:"10px"}}>Home</Button>
        </Box>
    </div>
}