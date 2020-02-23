import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Drawerleft from './drawerleft'
import Drawerrigth from './drawerrigth'
import './dashboard.css'

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

    };

    constructor(props) {
        super(props);

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
                    <div className="icon1" key="dl" data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }}><Drawerleft /></div>

                    {/*icon2, Drawer rigth*/}
                    <div className="icon2" key="dr" data-grid={{ x: 12, y: 0, w: 1, h: 1, static: true }}><Drawerrigth /></div>

                    {/*textbox1, Longitude Latitude*/}
                    <div className="textbox1" key="ll" data-grid={{ x: 3, y: 0, w: 1, h: 2, static: true }}>503242</div>

                    {/*Topbox*/}
                    <div className="topbox" key="i" data-grid={{ x: 5, y: 0, w: 2, h: 2 }}>hallo</div>

                    {/*textbox2, Time*/}
                    <div className="textbox2" key="ti" data-grid={{ x: 8, y: 0, w: 1, h: 2, static: true }}>12:36:56</div>



                    {/**/}



                    {/*2. Row*/}
                    {/*centerbox7*/}
                    <div className="centerbox7 grid-container" key="k" data-grid={{ x: 1, y: 1, w: 2, h: 4 }}>  <div className="ContainerWrapper">
                        <div className="topBar">
                            <div class="row">
                                <div className="data-box-abbreviation">
                                    Target </div>
                                <div className="data-box-aggregate">

                                </div>
                                <div className="data-box-icon">

                                </div>
                                <div>
                                    @
                                </div>


                            </div>
                        </div>
                        <div className="midBar" >3</div>
                        <div className="botBar">
                            <div class="row">
                                <div class="col">
                                    Target Speed</div>
                                <div class="col4">
                                    2 of 2
                             </div>
                            </div>
                        </div>
                    </div></div>

                    {/*centerbox8*/}
                    <div className="centerbox8 grid-container" key="l" data-grid={{ x: 9, y: 1, w: 2, h: 4 }}>  <div className="ContainerWrapper">
                        <div className="topBar">
                            <div class="row">
                                <div class="col">
                                    Perf </div>
                                <div class="col2">
                                    @
                          </div>
                            </div>
                        </div>
                        <div className="midBar" >{this.state.velocityMadeGoodValue}</div>
                        <div className="botBar">
                            <div class="row">
                                <div class="col">
                                    Performance</div>
                                <div class="col4">
                                    %
                              </div>
                            </div>
                        </div>
                    </div></div>

                    {/*Left 4 container Top*/}
                    {/*rimbox1-1*/}
                    <div className="rimbox1-1 grid-container" key="e" data-grid={{ x: 0, y: 4, w: 1, h: 2 }}>AWS{this.state.courseOverGroundTrueValue}</div>
                    {/*rimbox1-2*/}
                    <div className="rimbox1-2 grid-container" key="f" data-grid={{ x: 0, y: 5, w: 1, h: 2 }}>TWS{this.state.courseOverGroundTrueValue}</div>
                    {/*rimbox1-3*/}
                    <div className="rimbox1-3 grid-container" key="g" data-grid={{ x: 0, y: 6, w: 1, h: 2 }}>SOG{this.state.speedOverGroundValue}</div>
                    {/*rimbox1-4*/}
                    <div className="rimbox1-4 grid-container" key="h" data-grid={{ x: 0, y: 7, w: 1, h: 2 }}>STW{this.state.speedThroughWaterValue}</div>

                    {/*Rigth 4 container Top*/}
                    <div className="rimbox3-1 grid-container" key="c" data-grid={{ x: 11, y: 4, w: 1, h: 2 }}>AWS{this.state.courseOverGroundTrueValue}</div>
                    <div className="rimbox3-2 grid-container" key="d" data-grid={{ x: 11, y: 5, w: 1, h: 2 }}>TWS{this.state.courseOverGroundTrueValue}</div>
                    <div className="rimbox3-3 grid-container" key="j" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}>SOG{this.state.speedOverGroundValue}</div>
                    <div className="rimbox3-4 grid-container" key="d1" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}>STW{this.state.speedThroughWaterValue}</div>

                    {/*Rigth 4 container Bottom*/}
                    <div className="rimbox4-1 grid-container" key="i1" data-grid={{ x: 11, y: 15, w: 1, h: 2 }}>iii</div>
                    <div className="rimbox4-2 grid-container" key="j1" data-grid={{ x: 11, y: 17, w: 1, h: 2 }}>jjj</div>
                    <div className="rimbox4-3 grid-container" key="j2" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}>yyyy</div>
                    <div className="rimbox4-4 grid-container" key="c1" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}>cccc</div>

                    {/*Left 4 container Bottom*/}
                    <div className="rimbox2-1 grid-container" key="f1" data-grid={{ x: 0, y: 15, w: 1, h: 2 }}>xxxx</div>
                    <div className="rimbox2-2 grid-container" key="e1" data-grid={{ x: 0, y: 16, w: 1, h: 2 }}>eeee</div>
                    <div className="rimbox2-3 grid-container" key="h1" data-grid={{ x: 0, y: 17, w: 1, h: 2 }}>hhh</div>
                    <div className="rimbox2-4 grid-container" key="g1" data-grid={{ x: 0, y: 18, w: 1, h: 2 }}>gggg</div>

                    {/*Compass Rose*/}
                    {/*centerbox2*/}
                    <div className="centerbox2 grid-container" key="m" data-grid={{ x: 5, y: 7, w: 2, h: 3 }}>
                        <div className="ContainerWrapper">
                            <div className="topBar">
                                <div class="row">
                                    <div class="col">
                                        SOG</div>
                                    <div class="col2">
                                        @
                        </div>
                                </div>
                            </div>
                            <div className="midBar" >{this.state.speedOverGroundValue}</div>
                            <div className="botBar">
                                <div class="row">
                                    <div class="col">
                                        Speed over Grnd</div>
                                    <div class="col4">
                                        2 of 2
                            </div>
                                </div>
                            </div>
                        </div></div>

                    {/*centerbox3*/}
                    <div className="centerbox3 grid-container" key="n" data-grid={{ x: 4, y: 10, w: 2, h: 3 }}>
                        <div className="ContainerWrapper">
                            <div className="topBar">
                                <div class="row">
                                    <div class="col">
                                        AWS </div>
                                    <div class="col2">
                                        @
                          </div>
                                </div>
                            </div>
                            <div className="midBar" >{this.state.courseOverGroundTrueValue}</div>
                            <div className="botBar">
                                <div class="row">
                                    <div class="col">
                                        App. Wind Speed</div>
                                    <div class="col4">
                                        2 of 2
                          </div>
                                </div>
                            </div>
                        </div></div>
                    {/*centerbox4*/}
                    <div className="centerbox4 grid-container" key="o" data-grid={{ x: 6, y: 10, w: 2, h: 3 }}>    <div className="ContainerWrapper">
                        <div className="topBar">
                            <div class="row">
                                <div class="col">
                                    TWS</div>
                                <div class="col2">
                                    @
                            </div>
                            </div>
                        </div>
                        <div className="midBar" >{this.state.courseOverGroundTrueValue}</div>
                        <div className="botBar">
                            <div class="row">
                                <div class="col">
                                    True Wind Speed</div>
                                <div class="col4">
                                    2 of 2
                             </div>
                            </div>
                        </div>

                    </div></div>
                    {/*centerbox1*/}
                    <div className="centerbox1 grid-container" key="p" data-grid={{ x: 5, y: 13, w: 2, h: 3 }}>
                        <div className="ContainerWrapper">
                            <div className="topBar">
                                <div class="row">
                                    <div class="col">
                                        STW </div>
                                    <div class="col2">
                                        @
                                    </div>

                                </div>

                            </div>
                            <div className="midBar" >{this.state.speedThroughWaterValue}</div>
                            <div className="botBar">
                                <div class="row">
                                    <div class="col">
                                        Speed thru Water                     </div>
                                    <div class="col4">
                                        2 of 2
                            </div>

                                </div>

                            </div>

                        </div></div>

                    {/*Bottom 2 container */}
                    {/*centerbox5*/}
                    <div className="centerbox5 grid-container" key="q" data-grid={{ x: 1, y: 17, w: 2, h: 4 }}>VMG {this.state.velocityMadeGoodValue}</div>
                    {/*centerbox6*/}
                    <div className="centerbox6 grid-container" key="r" data-grid={{ x: 9, y: 17, w: 2, h: 4 }}>VMG {this.state.velocityMadeGoodValue}</div>

                    {/*bottombox*/}
                    <div className="bottombox " key="i2" data-grid={{ x: 5, y: 21, w: 2, h: 2 }}>I </div>



                    {this.generateDOM()}
                </ReactGridLayout>
            </div>
        );
    }
}

