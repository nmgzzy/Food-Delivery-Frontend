import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
//import Box from '@mui/material/Box';

const mapStyles = {
  width: 500,
  height: 400
};

export class Gmap extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={
          {
            lat: 50.9107499,
            lng: -1.4065178
          }
        }>
        <Marker
          name={'Dolores park'}
          position={{lat: 50.9107499, lng: -1.4065178}} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDfUft1in_hqA_k6NVMnxNAl0mfj-vD4mU'
})(Gmap)

export function getLocation() {
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      let lat = pos.coords.latitude,
        lng = pos.coords.longitude;
          // 获取到了用户当前位置的坐标
        alert(lng,lat);
        console.log("lng,lat: "+lng+","+lat);
      },error=>{
        switch(error.code){
        case error.PERMISSION_DENIED:
          console.log("请打开手机定位，并允许获取当前位置");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("定位失败，请退出重试!");
          break;
        case error.TIMEOUT:
          console.log("获取位置超时，请退出重试!");
          break;
        default:
          console.log("获取定位失败！");
      }
    });
  }else{
    console.log("当前浏览器不支持定位服务");
  }
}