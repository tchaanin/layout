import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './grid.css';
import CardItem from './CardItem';


const ReactGridLayout = WidthProvider(RGL);

export default class NoCompactingLayout extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        isResizable: true,
        cols: 12,
        rowHeight: 25,
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
            <ReactGridLayout
                layout={this.state.layout}

                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange}
                {...this.props}

            >


                {/*Top container*/}
                <div className="container" key="i" data-grid={{ x: 5, y: 0, w: 2, h: 2 }}>iii</div>

                {/*2. Row*/}
                <div className="container" key="k" data-grid={{ x: 1, y: 1, w: 2, h: 3 }}><CardItem /></div>
                <div className="container" key="l" data-grid={{ x: 9, y: 1, w: 2, h: 3 }}><CardItem /></div>

                {/*Left 4 container*/}
                <div className="container" key="e" data-grid={{ x: 0, y: 4, w: 1, h: 2 }}>eeee</div>
                <div className="container" key="f" data-grid={{ x: 0, y: 5, w: 1, h: 2 }}>ffff</div>
                <div className="container" key="g" data-grid={{ x: 0, y: 6, w: 1, h: 2 }}>gggg</div>
                <div className="container" key="h" data-grid={{ x: 0, y: 7, w: 1, h: 2 }}>hhhh</div>

                {/*Rigth 4 container Top*/}
                <div className="container" key="c" data-grid={{ x: 11, y: 4, w: 1, h: 2 }}>aaaa</div>
                <div className="container" key="d" data-grid={{ x: 11, y: 5, w: 1, h: 2 }}>dddd</div>
                <div className="container" key="j" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}>jjjj</div>
                <div className="container" key="d1" data-grid={{ x: 11, y: 7, w: 1, h: 2 }}>dddd</div>

                {/*Rigth 4 container Bottom*/}
                <div className="container" key="i1" data-grid={{ x: 11, y: 15, w: 1, h: 2 }}>iii</div>
                <div className="container" key="j1" data-grid={{ x: 11, y: 17, w: 1, h: 2 }}>jjj</div>
                <div className="container" key="j2" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}>yyyy</div>
                <div className="container" key="c1" data-grid={{ x: 11, y: 18, w: 1, h: 2 }}>cccc</div>

                {/*Left 4 container Bottom*/}
                <div className="container" key="f1" data-grid={{ x: 0, y: 15, w: 1, h: 2 }}>xxxx</div>
                <div className="container" key="e1" data-grid={{ x: 0, y: 16, w: 1, h: 2 }}>eeee</div>
                <div className="container" key="h1" data-grid={{ x: 0, y: 17, w: 1, h: 2 }}>hhh</div>
                <div className="container" key="g1" data-grid={{ x: 0, y: 18, w: 1, h: 2 }}>gggg</div>

                {/*Compass Rose*/}
                <div className="container" key="m" data-grid={{ x: 5, y: 7, w: 2, h: 3 }}><CardItem /></div>
                <div className="container" key="n" data-grid={{ x: 4, y: 10, w: 2, h: 3 }}><CardItem /></div>
                <div className="container" key="o" data-grid={{ x: 6, y: 10, w: 2, h: 3 }}><CardItem /></div>
                <div className="container" key="p" data-grid={{ x: 5, y: 13, w: 2, h: 3 }}><CardItem /></div>

                {/*Bottom 2 container */}
                <div className="container" key="q" data-grid={{ x: 1, y: 17, w: 2, h: 3 }}><CardItem /></div>
                <div className="container" key="r" data-grid={{ x: 9, y: 17, w: 2, h: 3 }}><CardItem /></div>

                {/*Bottom container */}
                <div className="container" key="i2" data-grid={{ x: 5, y: 21, w: 2, h: 2 }}>i</div>


                {this.generateDOM()}
            </ReactGridLayout>

        );
    }
}

