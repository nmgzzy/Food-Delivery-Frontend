import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: 300,
  height: 200
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