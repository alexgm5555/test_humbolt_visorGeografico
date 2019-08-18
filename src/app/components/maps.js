import React, { Component } from 'react'
import { Map,  Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
// import logo from '../logo.svg';
export class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = { latitud: 4.6167511, longitud: -74.071929,points:[] };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentDidMount() {
    console.log('Estoy aca')
    this.findLocations();
  }
  componentWillReceiveProps(next_props) {
    this.findLocations();
  }
  findLocations() {
    fetch('/api/coordinate')
      .then(res => res.json())
      .then(data => {
        this.setState({points: data});
      });
  }
  onDragEnd(text, type, tt) {
    this.setState({ latitud: tt.latLng.lat(), longitud: tt.latLng.lng() })
    this.props.onChangePosition(tt.latLng.lat(),tt.latLng.lng());
  }
  render() {
    var points = this.state.points
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    let iconMarker = new window.google.maps.MarkerImage(
      "http://maps.google.com/mapfiles/ms/icons/blue.png",
      null,
      null, 
      null, 
      new window.google.maps.Size(50, 50)
    );
    const container = {
      minHeight: '400px',
      maxHeight: '800px',
      height: "calc(100% - 64px)",
      width:'100%'
    };
    return (
      <div >
        <Map google={this.props.google} zoom={15}
          containerStyle={container}
          onClick={this.onMapClicked}
          initialCenter={{
            lat: 4.6167511,
            lng: -74.071929
          }}>
          
          {points.map(marker => {
            return (
              <Marker
                position={{ lat: marker.lat, lng: marker.lng }} />
            )
          })}
          <Marker
            icon={iconMarker}
            draggable={true}
            onDragend={this.onDragEnd}
            position={{ lat: this.state.latitud, lng: this.state.longitud }}
            />
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyA_WObUiYD7YpoYufR84re1LZHAJeAGXkY')
})(Maps);
