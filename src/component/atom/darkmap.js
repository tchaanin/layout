import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components';
import './map.css';


const Wrapper = styled.div`
    width: 100%;
    heigth: ${props => props.heigth};
`;

export default class DarkMap extends React.Component {

    componentDidMount() {
        this.map = L.map('map', {
            center: [58, 16],
            zoom: 5,
            zoomControl: false
        });


        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17,
            zIndex: 1,
        }).addTo(this.map);

        L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17,
            zIndex: 2,
        }).addTo(this.map);
    }


    render() {
        return <div className="map"><div className="wrapper">
            <Wrapper width="100%" heigth="100%" id="map" /></div></div>
    }
}