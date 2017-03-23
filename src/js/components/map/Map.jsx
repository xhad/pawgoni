import React, {PropTypes} from "react"
import { Card } from 'react-materialize';
import config from '../../../../config/conf';
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"

const MY_API_KEY = config.GOOGLE_MAPS_API_KEY;

const Map = ({googleMaps}) => (
  // GoogleMap component has a 100% height style.
  // You have to set the DOM parent height.
  // So you can perfectly handle responsive with differents heights.
    <div className={'map'}>
      <GoogleMap
        googleMaps={googleMaps}
        // You can add and remove coordinates on the fly.
        // The map will rerender new markers and remove the old ones.
        coordinates={[
          {
            title: "Seoul",
            position: {
              lat: 37.5665,
              lng: 126.9780,
            },
            onLoaded: (googleMaps, map, marker) => {
              // Set Marker animation
              {/*marker.setAnimation(googleMaps.Animation.BOUNCE)*/}

              // Define Marker InfoWindow
              const infoWindow = new googleMaps.InfoWindow({
                content: `
                  <div>
                    <p> {
                      "ip": "218.152.212.96",
                      "country_code": "KR",
                      "country_name": "Republic of Korea",
                      "region_code": "",
                      "region_name": "",
                      "city": "",
                      "zip_code": "",
                      "time_zone": "Asia/Seoul",
                      "latitude": 37.5112,
                      "longitude": 126.9741,
                      "metro_code": 0
                    } </p>
                  </div>
                `,
              })

              // Open InfoWindow when Marker will be clicked
              googleMaps.event.addListener(marker, "click", () => {
                infoWindow.open(map, marker)
              })

              // Change icon when Marker will be hovered
              {/*googleMaps.event.addListener(marker, "mouseover", () => {
                marker.setIcon(iconMarkerHover)
              })*/}

              {/*googleMaps.event.addListener(marker, "mouseout", () => {
                marker.setIcon(iconMarker)
              })*/}

              // Open InfoWindow directly
              infoWindow.open(map, marker)
            },
          }
        ]}
        center={{lat: 37.5665, lng: 126.9780}}
        zoom={3}
        onLoaded={(googleMaps, map) => {
          map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
        }}
      />
    </div>
)

Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}

export default GoogleMapLoader(Map, {
  libraries: ["places"],
  key: MY_API_KEY
})
