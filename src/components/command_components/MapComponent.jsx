import React from 'react'
import { GoogleMap, Marker } from 'react-google-maps'
import withGoogleMap from 'react-google-maps/lib/withGoogleMap'
import withScriptjs from 'react-google-maps/lib/withScriptjs'
import Style from './MapComponent.module.scss'


function MapComponent({commandData}) {
    // console.log(commandData)

    function map() {
        return (
            <GoogleMap
                defaultZoom = {12}
                defaultCenter =  {{ lat: commandData.lat, lng: commandData.lng}}
            >
               <Marker position={{ lat: commandData.lat, lng: commandData.lng}}></Marker> 
            </GoogleMap>
        )
    }
    const WrappedMap = withScriptjs(withGoogleMap(map))
   

    return (
        <div className={Style.container}>
            <div className={Style.mapTitle}>User Location on a Map</div>
            <div className={Style.mapContainer}>
                <WrappedMap
                    googleMapURL = {"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAghzQ21e6CD-_1OyS3N-0q2YXwFGa34FI"}
                    loadingElement = {<div style={{ height: `100%` }} />}
                    containerElement = {<div style={{ height: `100%` }} />}
                    mapElement = {<div style={{ height: `100%` }} />}
                />
            </div>
        </div>
    )
}

export default MapComponent


