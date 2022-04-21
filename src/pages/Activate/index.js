import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';

export default function Activate() {
    const sendToken = () => {
        let ret = 0;
        axios.get('https://fd.shimonzhan.com/api/user/activate'+window.location.search)
        .then(function (res) {
            console.log(res);
            ret = 1;
        })
        .catch(function (err) {
            console.log(err);
        });
        return ret;
    }

    const ret = sendToken();

    return <div>
        <h1>Activate Success:{ret}</h1>
        <Button href="/login" variant='contained' sx={{margin:"10px"}}>Login</Button>
        <Button href='/' variant='contained' sx={{margin:"10px"}}>Home</Button>
    </div>
}