import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import styles from './simpleMap.module.scss'; 
 
const AnyReactComponent = ({ text }) => <div className={styles.markerText} >{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 1.512670,
      lng: 103.655730
    },
    zoom: 15
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className={styles.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA-rpia_5_iNHy9RORmcNE48GeSMpC0ryQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={1.512670}
            lng={103.655730}
            text="We are here"
          />

        </GoogleMapReact>
      </div>

    );
  }
}
 
export default SimpleMap;