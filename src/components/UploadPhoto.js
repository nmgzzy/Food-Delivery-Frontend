import React from "react";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UseUser } from "./UserContext";
import { Typography, Box, Paper } from "@mui/material";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default function UploadPhoto(props) {
  const { url, sx, defaultImage, alt, setOpen } = props;
  const { user } = UseUser();
  const [ img, setImg ] = React.useState("");

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      setOpen({open:true, msg:"You can only upload JPG/PNG file!", type:"error"});
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      setOpen({open:true, msg:"Image must smaller than 5MB!", type:"error"});
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => setImg(imageUrl));
      setOpen({open:true, msg:`${info.file.name} file uploaded successfully`, type:"success"});
    } else if (info.file.status === 'error') {
      setOpen({open:true, msg:`${info.file.name} file upload failed.`, type:"error"});
    }
  };

  const picture = ()=>{
    if (img === "" ) {
      if (defaultImage) {
        return <img src={defaultImage} alt={alt} style={{ width: '100%'}} />
      }
      return <div style={{height:100}}/>
    }
    return <img src={img} alt={alt} style={{ width: '100%'}} />
  }

  return (
    <Paper sx={sx}>
      <Upload
        name="file"
        method="PUT"
        showUploadList={false}
        action={'https://fd.shimonzhan.com/api/' + url}//restaurant/updateRestaurantAvatar?restaurantId=195
        headers={{ Authorization: "Bearer " + user.token }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Box style={{ padding: '20px', width:'100%'}} sx={{backgroundColor:"#fff"}}>
          {picture()}
          <Typography variant="body1" align="center"><UploadOutlined />{" "}Click to Upload{" "}<UploadOutlined /></Typography>
        </Box>
      </Upload>
    </Paper>
  )
};