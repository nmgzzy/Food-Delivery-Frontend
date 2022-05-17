import React from 'react';
import GoogleMapReact from 'google-map-react';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

export default function SimpleMap(props){
  const { lat, lng, style} = props;
  var defaultProps = {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: 14
  };

  return (
    // Important! Always set the container height explicitly
    // 
    <div style={style}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDfUft1in_hqA_k6NVMnxNAl0mfj-vD4mU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
        >
          <DeliveryDiningIcon fontSize='large' color='icon'/>
        </div>
        <div
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
        >
          marker
        </div>
      </GoogleMapReact>
    </div>
  );
}

export function getLocation() {
  var lat, lng;
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        console.log("lng,lat: "+lng+","+lat);
      },error=>{
        switch(error.code){
        case error.PERMISSION_DENIED:
          console.log("PERMISSION_DENIED");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("POSITION_UNAVAILABLE");
          break;
        case error.TIMEOUT:
          console.log("TIMEOUT");
          break;
        default:
          console.log("other error");
      }
    });
  }else{
    console.log("Current browser does not support location services");
  }
  return {lat, lng};
}