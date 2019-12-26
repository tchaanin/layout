import React, { Component } from 'react'
import ResizableRect from 'react-resizable-rotatable-draggable'


class resizeComp extends Component {
    constructor() {
        super()
        this.state = {
            width: 100,
            height: 100,
            top: 10,
            left: 10,
        }
    }

    handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)
        this.setState({
            top,
            left,
            width,
            height
        })
    }


    handleDrag = (deltaX, deltaY) => {
        this.setState({
            left: this.state.left + deltaX,
            top: this.state.top + deltaY
        })
    }

    render() {
        const { width, top, left, height, rotateAngle } = this.state
        return (
            <div className="App">
                <ResizableRect
                    left={left}
                    top={top}
                    width={width}
                    height={height}
                    rotateAngle={rotateAngle}
                    // aspectRatio={false}
                    // minWidth={10}
                    // minHeight={10}
                    zoomable='nw, ne, se, sw'
                    // rotatable={true}
                    // onRotateStart={this.handleRotateStart}
                    // onRotateEnd={this.handleRotateEnd}
                    // onResizeStart={this.handleResizeStart}
                    onResize={this.handleResize}
                    // onResizeEnd={this.handleUp}
                    // onDragStart={this.handleDragStart}
                    onDrag={this.handleDrag}
                // onDragEnd={this.handleDragEnd}
                />
            </div>
        )
    }
}

export default resizeComp