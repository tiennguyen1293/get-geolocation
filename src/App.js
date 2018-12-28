import React, { Component } from 'react';
import MapComponent from './MapComponent';

const getGeoLocation = () => {
  const geolocation = navigator.geolocation;
  
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }
    
    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject (new Error('Permission denied'));
    });
  });
  
  return location
};

class App extends Component {
  state = {
    loading: true,
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    isMarkerShown: false
  }

  componentDidMount() {
    this.initGeoLocation();
  }

  componentWillUpdate(){
    this.initGeoLocation()
  }

  initGeoLocation() {
    getGeoLocation().then(location=> {
      this.setState({
        loading: false,
        currentLatLng: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
        isMarkerShown: true
      })
    });
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.initGeoLocation()
  }

  render() {
    const { loading, isMarkerShown, currentLatLng } = this.state;

    if (loading) {
      return 'Loading...';
    }

    return (
      <MapComponent
        isMarkerShown={isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={currentLatLng}
      />
    );
  }
}

export default App;
