import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Drawerleft from '../../drawerleft'
import './dashboard.css'
import './dashboardNigth.css'


const client = new W3CWebSocket('ws://demo.signalk.org/signalk/v1/stream?subscribe=none');

const ReactGridLayout = WidthProvider(RGL);

export default class NoCompactingLayout extends React.PureComponent {
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

    };;


    constructor(props) {
        super(props);
        const layout = this.generateLayout();
        this.state = {
            layout
        };
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
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
        this.setState({ isChecked: true })
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

                console.log(propertieName);




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

    getRoundedNumber(value) {
        if (!isNaN(value)) {
            value = Math.round(value * 80) / 80
            console.log(value)
        }
        return value
    }

    render() {

        return (

            <div className="background">

                <ReactGridLayout
                    layout={this.state.layout}

                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    {...this.props}

                >
                    {/*icon1, Drawer left*/}
                    <div className="icon1" key="dl" data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }}>
                        {console.log("Hallooo")}
                        {console.log(this.state.isChecked)}
                        <Drawerleft
                            isChecked={this.props.isChecked}
                            onChange={this.toggleChange} /></div>

                    {/*icon2, Drawer rigth*/}
                    <div className="icon2" key="dr" data-grid={{ x: 12, y: 0, w: 1, h: 1, static: true }}></div>


                    {/*textbox1, Longitude Latitude*/}
                    <div className="textbox1" key="ll" data-grid={{ x: 3, y: 0, w: 1, h: 2, static: true }}>{this.state.dataLatitude} :: {this.state.dataLongitude}</div>

                    {/*Topbox*/}
                    <div className="topbox" key="i" data-grid={{ x: 5, y: 0, w: 2, h: 2 }}></div>

                    {/*textbox2, Time*/}
                    <div className="textbox2" key="ti" data-grid={{ x: 8, y: 0, w: 1, h: 1, static: true }}>12:36:56</div>



                    {/**/}



                    {/*2. Row*/}
                    {/*centerbox7*/}
                    <div className={this.props.isDarkMode ? "centerbox7 grid-container-night container" : "centerbox7 grid-container"} key="k" data-grid={{ x: 1, y: 1, w: 2, h: 4 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>



                    {/*centerbox8*/}
                    <div className={this.props.isDarkMode ? "centerbox8 grid-container-night container" : "centerbox8 grid-container"} key="l" data-grid={{ x: 9, y: 1, w: 2, h: 4 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>



                    {/*Left 4 container Top*/}
                    {/*rimbox1-1*/}
                    <div className={this.props.isDarkMode ? "rimbox1-1 grid-container-night container" : "rimbox1-1 grid-container"} key="e" data-grid={{ x: 0, y: 4, w: 1, h: 2 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>

                    {/*rimbox1-2*/}
                    <div className={this.props.isDarkMode ? "rimbox1-2 grid-container-night container" : "rimbox1-2 grid-container"} key="f" data-grid={{ x: 0, y: 5, w: 1, h: 2 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>

                    {/*rimbox1-3*/}
                    <div className={this.props.isDarkMode ? "rimbox1-3 grid-container-night container" : "rimbox1-3 grid-container"} key="g" data-grid={{ x: 0, y: 6, w: 1, h: 2 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>



                    {/*rimbox1-4*/}
                    <div className={this.props.isDarkMode ? "rimbox1-4 grid-container-night container" : "rimbox1-4 grid-container"} key="h" data-grid={{ x: 0, y: 7, w: 1, h: 2 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>




                    {/*Rigth 4 container Top*/}
                    <div className={this.props.isDarkMode ? "rimbox3-1 grid-container-night container" : "rimbox3-1 grid-container"} key="c" data-grid={{ x: 11, y: 4, w: 1, h: 2 }}><div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>
                    <div className={this.props.isDarkMode ? "rimbox3-2 grid-container-night container" : "rimbox3-2 grid-container"} key="d" data-grid={{ x: 11, y: 5, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>



                    <div className={this.props.isDarkMode ? "rimbox3-3 grid-container-night container" : "rimbox3-3 grid-container"} key="j" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>

                    <div className={this.props.isDarkMode ? "rimbox3-4 grid-container-night container" : "rimbox3-4 grid-container"} key="d1" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>


                    {/*Rigth 4 container Bottom*/}

                    <div className={this.props.isDarkMode ? "rimbox4-1 grid-container-night container" : "rimbox4-1 grid-container"} key="i1" data-grid={{ x: 11, y: 15, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>

                    <div className={this.props.isDarkMode ? "rimbox4-2 grid-container-night container" : "rimbox4-2 grid-container"} key="j1" data-grid={{ x: 11, y: 17, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>

                    <div className={this.props.isDarkMode ? "rimbox4-3 grid-container-night container" : "rimbox4-3 grid-container"} key="j2" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>

                    <div className={this.props.isDarkMode ? "rimbox4-4 grid-container-night container" : "rimbox4-4 grid-container"} key="c1" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>



                    {/*Left 4 container Bottom*/}
                    <div className={this.props.isDarkMode ? "rimbox2-1 grid-container-night container" : "rimbox2-1 grid-container"} key="f1" data-grid={{ x: 0, y: 15, w: 1, h: 2 }}>
                        <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div>
                    </div>
                    <div className={this.props.isDarkMode ? "rimbox2-2 grid-container-night container" : "rimbox2-2 grid-container"} key="e1" data-grid={{ x: 0, y: 16, w: 1, h: 2 }}><div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>
                    <div className={this.props.isDarkMode ? "rimbox2-3 grid-container-night container" : "rimbox2-3 grid-container"} key="h1" data-grid={{ x: 0, y: 17, w: 1, h: 2 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>
                    <div className={this.props.isDarkMode ? "rimbox2-4 grid-container-night container" : "rimbox2-4 grid-container"} key="g1" data-grid={{ x: 0, y: 18, w: 1, h: 2 }}><div style={{ float: "right" }} >
                        <div onClick={() => {
                            this.setState({
                                isVisible: true,
                                name: "SWT",
                                value: "this.state.speedThroughWaterValue"
                            })
                        }
                        } style={{ float: "left" }}>Lupe</div>
                        <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                    </div></div>

                    {/*Compass Rose*/}
                    {/*centerbox2*/}
                    <div className={this.props.isDarkMode ? "centerbox2 grid-container-night container" : "centerbox2 grid-container"} key="m" data-grid={{ x: 5, y: 7, w: 2, h: 3 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>




                    {/*centerbox3*/}
                    <div className={this.props.isDarkMode ? "centerbox3 grid-container-night container" : "centerbox3 grid-container"} key="n" data-grid={{ x: 4, y: 10, w: 2, h: 3 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>


                    {/*centerbox4*/}

                    <div className={this.props.isDarkMode ? "centerbox4 grid-container-night container" : "centerbox4 grid-container"} key="o" data-grid={{ x: 6, y: 10, w: 2, h: 3 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>


                    {/*centerbox1*/}
                    <div className={this.props.isDarkMode ? "centerbox1 grid-container-night container" : "centerbox1 grid-container"} key="p" data-grid={{ x: 5, y: 13, w: 2, h: 3 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>



                    {/*Bottom 2 container */}
                    {/*centerbox5*/}
                    <div className={this.props.isDarkMode ? "centerbox5 grid-container-night container" : "centerbox5 grid-container"} key="q" data-grid={{ x: 1, y: 17, w: 2, h: 4 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>

                    {/*centerbox6*/}
                    <div className={this.props.isDarkMode ? "centerbox6 grid-container-night container" : "centerbox6 grid-container"} key="r" data-grid={{ x: 9, y: 17, w: 2, h: 4 }}> <div style={{ float: "left" }}>SWT 2.6</div>
                        <div style={{ float: "right" }} >
                            <div onClick={() => {
                                this.setState({
                                    isVisible: true,
                                    name: "SWT",
                                    value: "this.state.speedThroughWaterValue"
                                })
                            }
                            } style={{ float: "left" }}>Lupe</div>
                            <div style={{ float: "right" }} onClick={() => console.log("Close")}>Close</div>
                        </div></div>



                    {/*bottombox*/}
                    <div className="bottombox " key="i2" data-grid={{ x: 5, y: 21, w: 2, h: 2 }}></div>



                    {this.generateDOM()}
                </ReactGridLayout >
            </div >
        );
    }
}

