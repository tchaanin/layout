import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './grid.css';
import CardItem from './CardItem';
import CardItem2 from './CardItem2';
import Drawerleft from './drawerleft'
import Drawerrigth from './drawerrigth'
import FullScreen from './FullscreenMode'

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

                <div className="container Air" key="g1" data-grid={{ x: 2, y: 3, w: 9, h: 14, static: true }}>gggg</div>




                {this.generateDOM()}
            </ReactGridLayout>
        );
    }
}

