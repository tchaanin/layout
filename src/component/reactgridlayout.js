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
        rowHeight: 30,
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


                <div className="container" key="c" data-grid={{ x: 8, y: 2, w: 1, h: 2 }}>c</div>
                <div className="container" key="d" data-grid={{ x: 9, y: 2, w: 1, h: 2 }}>d</div>
                <div className="container" key="e" data-grid={{ x: 2, y: 2, w: 1, h: 2 }}>e</div>
                <div className="container" key="f" data-grid={{ x: 3, y: 2, w: 1, h: 2 }}>f</div>
                <div className="container" key="g" data-grid={{ x: 4, y: 2, w: 1, h: 2 }}>g</div>
                <div className="container" key="h" data-grid={{ x: 5, y: 2, w: 1, h: 2 }}>h</div>
                <div className="container" key="i" data-grid={{ x: 6, y: 2, w: 1, h: 2 }}>i</div>
                <div className="container" key="j" data-grid={{ x: 7, y: 2, w: 1, h: 2 }}>j</div>

                <div className="container" key="k" data-grid={{ x: 2, y: 4, w: 3, h: 3 }}>i</div>
                <div className="container" key="l" data-grid={{ x: 7, y: 4, w: 3, h: 3 }}>j</div>

                <div className="container" key="m" data-grid={{ x: 5, y: 8, w: 2, h: 3 }}>A</div>
                <div className="container" key="n" data-grid={{ x: 4, y: 11, w: 2, h: 3 }}>B</div>
                <div className="container" key="o" data-grid={{ x: 6, y: 11, w: 2, h: 3 }}>C</div>
                <div className="container" key="p" data-grid={{ x: 5, y: 14, w: 2, h: 3 }}>D</div>

                <div className="container" key="q" data-grid={{ x: 2, y: 18, w: 3, h: 3 }}>k</div>
                <div className="container" key="r" data-grid={{ x: 7, y: 18, w: 3, h: 3 }}>l</div>

                <div className="container" key="c1" data-grid={{ x: 8, y: 21, w: 1, h: 2 }}>c</div>
                <div className="container" key="d1" data-grid={{ x: 9, y: 21, w: 1, h: 2 }}>d</div>
                <div className="container" key="e1" data-grid={{ x: 2, y: 21, w: 1, h: 2 }}>e</div>
                <div className="container" key="f1" data-grid={{ x: 3, y: 21, w: 1, h: 2 }}>f</div>
                <div className="container" key="g1" data-grid={{ x: 4, y: 21, w: 1, h: 2 }}>g</div>
                <div className="container" key="h1" data-grid={{ x: 5, y: 21, w: 1, h: 2 }}>h</div>
                <div className="container" key="i1" data-grid={{ x: 6, y: 21, w: 1, h: 2 }}>i</div>
                <div className="container" key="j1" data-grid={{ x: 7, y: 21, w: 1, h: 2 }}>j</div>

                {this.generateDOM()}
            </ReactGridLayout>

        );
    }
}

