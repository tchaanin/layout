import GridLayout from 'react-grid-layout';
import React from 'react';
import './grid.css';
import RGL, { WidthProvider } from "react-grid-layout";



export default class MyFirstGrid extends React.Component {


    render() {


        // layout is an array of objects, see the demo for more complete usage
        const layout = [
            { i: 'a', x: 2, y: 0, w: 3, h: 2, },
            { i: 'b', x: 5, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
            { i: 'c', x: 8, y: 0, w: 3, h: 2, },
            { i: 'd', x: 0, y: 5, w: 1, h: 1, },
            { i: 'e', x: 3, y: 2, w: 1, h: 1, }


        ];
        return (
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange}
                <div className="container" key="a">a</div>
                <div className="container" key="b">b</div>
                <div className="container" key="c">c</div>
                <div className="container" key="d">d</div>
                <div className="container" key="e">e</div>


            </GridLayout>
        )
    }
}