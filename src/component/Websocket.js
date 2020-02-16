import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";


const client = new W3CWebSocket('ws://demo.signalk.org/signalk/v1/stream?subscribe=none');


export default class SignalKClient extends React.Component {

    constructor(props) {
        super(props);
        this.state = { number: this.props.number };
    }

    componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');

            var msg = { "context": "vessels.self", "subscribe": [{ "path": "*" }], "format": "delta", "policy": "instant" };

            client.send(JSON.stringify(msg));

        };

        client.onmessage = (message) => {

            const position = JSON.parse(message.data);


            try {
                const key = position.updates[0].source.sentence
                const propertieName = position.updates[0].values[0].path;
                const value = position.updates[0].values[0].value;

                console.log("joo", propertieName)


                if (propertieName === 'navigation.speedOverGround') {
                }

                if (propertieName === 'navigation.speedOverGround') {
                    console.log('gutenmorgen' + value)
                    console.log('gutenmorgen2' + value)
                    this.setState({ speedOverGroundValue: value })
                    this.setState({ speedOverGroundKey: key })
                    this.setState({ speedOverGroundName: propertieName })
                }



                if (propertieName === 'environment.depth.belowTransducer') {
                    this.setState({ belowTransducer: value })
                    this.setState({ belowTransducerKey: key })
                    this.setState({ belowTransducerName: propertieName })
                }

                if (propertieName === 'environment.wind.angleTrueWater') {
                    this.setState({ angleTrueWaterValue: value })
                    this.setState({ angleTrueWaterKey: key })
                    this.setState({ angleTrueWaterName: propertieName })
                }


                if (propertieName === 'navigation.courseRhumbline.crossTrackError') {
                    this.setState({ crossTrackErrorValue: value })
                    this.setState({ crossTrackErrorrKey: key })
                    this.setState({ crossTrackErrorName: propertieName })
                }

                if (propertieName === 'performance.velocityMadeGood') {
                    this.setState({ velocityMadeGoodValue: value })
                    this.setState({ velocityMadeGoodKey: key })
                    this.setState({ velocityMadeGoodName: propertieName })
                }

                if (propertieName === 'navigation.courseOverGroundTrue') {
                    this.setState({ courseOverGroundTrueValue: value })
                    this.setState({ courseOverGroundTrueKey: key })
                    this.setState({ courseOverGroundTrueName: propertieName })
                }

                if (propertieName === 'environment.wind.speedTrue') {
                    this.setState({ courseOverGroundTrueValue: value })
                    this.setState({ courseOverGroundTrueKey: key })
                    this.setState({ courseOverGroundTrueName: propertieName })
                }


                if (propertieName === 'environment.current') {
                    this.setState({ environmentCurrentValue: value })
                    this.setState({ environmentCurrentKey: key })
                    this.setState({ environmentCurrentName: propertieName })
                }


                if (propertieName === 'navigation.speedThroughWater') {
                    this.setState({ speedThroughWaterValue: value })
                    this.setState({ speedThroughWaterKey: key })
                    this.setState({ speedThroughWaterName: propertieName })
                }


                if (propertieName === 'navigation.courseOverGroundMagnetic') {
                    this.setState({ courseOverGroundTrueValue: value })
                    this.setState({ courseOverGroundTrueKey: key })
                    this.setState({ courseOverGroundTrueName: propertieName })
                }


                if (propertieName === 'environment.wind.speedApparent') {
                    this.setState({ courseOverGroundTrueValue: value })
                    this.setState({ courseOverGroundTrueKey: key })
                    this.setState({ courseOverGroundTrueName: propertieName })
                }

                if (propertieName === 'environment.wind.angleApparent') {
                    this.setState({ courseOverGroundTrueValue: value })
                    this.setState({ courseOverGroundTrueKey: key })
                    this.setState({ courseOverGroundTrueName: propertieName })
                }



                if (key !== undefined && propertieName !== undefined && value !== undefined) {


                    const SpeedOGround = position.updates[0].values[0].value.speedOverGround;
                    this.setState({ propertieNamesetSpeedOGround: SpeedOGround })


                    if (key === 'GLL') {
                        const latitude = position.updates[0].values[0].value.latitude;
                        const longitude = position.updates[0].values[0].value.longitude;
                        this.setState({ propertieNameGLL: propertieName })
                        this.setState({ dataLatitude: latitude })
                        this.setState({ dataLongitude: longitude })
                    } else if (key === 'VDR') {
                        console.log('sieg')

                        const setTru = position.updates[0].values[0].value.setTrue;
                        console.log('hier' + setTru)

                        const magnetic = position.updates[0].values[0].value.setMagnetic;
                        const drift = position.updates[0].values[0].value.drift;

                        this.setState({ propertieNamesetTru: setTru })
                        this.setState({ magnetic: magnetic })
                        this.setState({ drift: drift })
                    }
                }

            } catch (e) {
                console.log("YO", e)
            }

            {/*Drawer left
            try {
                const longitude = position.updates[0].values[0].value.longitude;


                console.log('longitude' + longitude)
            }*/}


        }
    }


    render() {




        return (
            <div className="position">
                <div>Kompass Rose</div>
                <div>speedOverGround SOG: {this.state.speedOverGroundValue}</div>
                <div>Speed thru Water: STW{this.state.speedThroughWaterValue}</div>
                <div>True Wind Speed: TWS {this.state.courseOverGroundTrueValue}</div>
                <div>App. Wind Speed: AWS {this.state.courseOverGroundTrueValue}</div>
                <div>hi</div>


                <div>Vel. Made Good: VMG {this.state.velocityMadeGoodValue}</div>
                <div>angleTrueWater: {this.state.belowTransducer}</div>
                <div>belowTransducerKey: {this.state.belowTransducerKey}</div>
                <div>angleTrueWaterKey: {this.state.angleTrueWaterKey}</div>
                <div>navigation.speedThroughWater: {this.state.speedThroughWaterValue}</div>

                <div>courseOverGroundTrueValue: {this.state.courseOverGroundTrueValue}</div>
                <div>courseOverGroundTrueKey: {this.state.courseOverGroundTrueKey}</div>
                <div>angleTrueWater: {this.state.belowTransducer}</div>
                <div>angleTrueWater: {this.state.belowTransducerKey}</div>
            </div>
        );
    }
}

