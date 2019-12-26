import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './grid.css';

const ReactGridLayout = WidthProvider(RGL);

export default class NoCompactingLayout extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        isResizable: true,
        items: 3,
        cols: 12,
        rowHeight: 20,
        onLayoutChange: function () { },
        // This turns off compaction so you can place items wherever.
        verticalCompact: false
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
                h: 3,
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
                <div className="container" key="c" data-grid={{ x: 8, y: 3, w: 1, h: 2 }}>c</div>
                <div className="container" key="d" data-grid={{ x: 9, y: 3, w: 1, h: 2 }}>d</div>
                <div className="container" key="e" data-grid={{ x: 2, y: 3, w: 1, h: 2 }}>e</div>
                <div className="container" key="f" data-grid={{ x: 3, y: 3, w: 1, h: 2 }}>f</div>
                <div className="container" key="g" data-grid={{ x: 4, y: 3, w: 1, h: 2 }}>g</div>
                <div className="container" key="h" data-grid={{ x: 5, y: 3, w: 1, h: 2 }}>h</div>
                <div className="container" key="i" data-grid={{ x: 6, y: 3, w: 1, h: 2 }}>i</div>
                <div className="container" key="j" data-grid={{ x: 7, y: 3, w: 1, h: 2 }}>j</div>



                {this.generateDOM()}
            </ReactGridLayout>

        );
    }
}

