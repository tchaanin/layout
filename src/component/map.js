import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components';
import './map.css';
import ReactGrid from './reactgridlayout';


const Wrapper = styled.div`
    width: 100%;
    heigth: ${props => props.heigth};
`;

export default class Map extends React.Component {

    componentDidMount() {
        this.map = L.map('map', {
            center: [58, 16],
            zoom: 15,
            zoomControl: false
        });

        var marker = L.marker([51.5, -0.09]).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
            <Wrapper width="1280px" heigth="720px" id="map" /></div></div>
    }
}