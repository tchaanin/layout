import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './grid.css';
import DrawerLeft from './drawerleft';
import DrawerRigth from './drawerrigth'

const ReactGridLayout = WidthProvider(RGL);

const client = new W3CWebSocket('ws://demo.signalk.org/signalk/v1/stream?subscribe=none');


export default class SignalKClient extends React.Component {

    static defaultProps = {
        className: "layout",
        isResizable: true,
        cols: 12,
        rowHeight: 19,
        onLayoutChange: function () { },
        // This turns off compaction so you can place items wherever.
        verticalCompact: false,
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: true

    };

    constructor(props) {
        super(props);
        this.state = { number: this.props.number };

        const layout = this.generateLayout();
        this.state = { layout };
    }

    generateDOM() {
        return _.map(_.range(this.props.items), function (i) {
            return (
                <div className="container" key={i}>
                    <span className="text">{i}</span>
                </div>
            );
        });
    }

    generateLayout() {
        const p = this.props;
        return _.map(new Array(p.items), function (item, i) {
            const x = i * 2 + 3
            return {
                x: x,
                y: 0,
                w: 2,
                h: 2,
                i: i.toString()
            };
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
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

                <ReactGridLayout
                    layout={this.state.layout}

                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    {...this.props}

                >
                    {/*Drawer left*/}
                    <div className="drawerLeft" key="dl" data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }}><DrawerLeft /></div>

                    {/*Drawer rigth*/}
                    <div className="drawerRigth" key="dr" data-grid={{ x: 12, y: 0, w: 1, h: 1, static: true }}><DrawerRigth /></div>


                    {/*Top container*/}
                    <div className="container top" key="i" data-grid={{ x: 5, y: 0, w: 2, h: 2 }}></div>

                    {/*2. Row*/}
                    <div className="container row2" key="k" data-grid={{ x: 1, y: 1, w: 2, h: 3 }}></div>
                    <div className="container row2" key="l" data-grid={{ x: 9, y: 1, w: 2, h: 3 }}></div>

                    {/*Left 4 container Top*/}
                    <div className="container rose2" key="e" data-grid={{ x: 0, y: 4, w: 1, h: 2 }}>eeee</div>
                    <div className="container rose3" key="f" data-grid={{ x: 0, y: 5, w: 1, h: 2 }}>ffff</div>
                    <div className="container rose1" key="g" data-grid={{ x: 0, y: 6, w: 1, h: 2 }}>gggg</div>
                    <div className="container rose4" key="h" data-grid={{ x: 0, y: 7, w: 1, h: 2 }}>hhhh</div>

                    {/*Rigth 4 container Top*/}
                    <div className="container rose2" key="c" data-grid={{ x: 11, y: 4, w: 1, h: 2 }}>aaaa</div>
                    <div className="container rose3" key="d" data-grid={{ x: 11, y: 5, w: 1, h: 2 }}>dddd</div>
                    <div className="container rose1" key="j" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}>jjjj</div>
                    <div className="container rose4" key="d1" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}>dddd</div>

                    {/*Rigth 4 container Bottom*/}
                    <div className="container bot1" key="i1" data-grid={{ x: 11, y: 15, w: 1, h: 2 }}>iii</div>
                    <div className="container bot2" key="j1" data-grid={{ x: 11, y: 17, w: 1, h: 2 }}>jjj</div>
                    <div className="container bot3" key="j2" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}>yyyy</div>
                    <div className="container Water" key="c1" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}>cccc</div>

                    {/*Left 4 container Bottom*/}
                    <div className="container bot1" key="f1" data-grid={{ x: 0, y: 15, w: 1, h: 2 }}>xxxx</div>
                    <div className="container bot2" key="e1" data-grid={{ x: 0, y: 16, w: 1, h: 2 }}>eeee</div>
                    <div className="container bot3" key="h1" data-grid={{ x: 0, y: 17, w: 1, h: 2 }}>hhh</div>
                    <div className="container Air" key="g1" data-grid={{ x: 0, y: 18, w: 1, h: 2 }}>gggg</div>

                    {/*Compass Rose*/}
                    <div className="container rose1" key="m" data-grid={{ x: 5, y: 7, w: 2, h: 3 }}></div>
                    <div className="container rose2" key="n" data-grid={{ x: 4, y: 10, w: 2, h: 3 }}></div>
                    <div className="container rose3" key="o" data-grid={{ x: 6, y: 10, w: 2, h: 3 }}></div>
                    <div className="container rose4" key="p" data-grid={{ x: 5, y: 13, w: 2, h: 3 }}></div>

                    {/*Bottom 2 container */}
                    <div className="container bot1" key="q" data-grid={{ x: 1, y: 17, w: 2, h: 4 }}></div>
                    <div className="container bot1" key="r" data-grid={{ x: 9, y: 17, w: 2, h: 4 }}></div>

                    {/*Bottom container */}
                    <div className="container top" key="i2" data-grid={{ x: 5, y: 21, w: 2, h: 2 }}></div>


                    {this.generateDOM()}




                </ReactGridLayout>



                {/*
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
                <div>angleTrueWater: {this.state.belowTransducerKey}</div>*/}
            </div >
        );
    }
}

