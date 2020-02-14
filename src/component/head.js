
import React, { Component } from 'react'
import './header.css'
import Drawerleft from './drawerleft';
import Drawerrigth from './drawerrigth';

export default class head extends Component {
    render() {
        return (
            <div className="header" data-grid={{ x: 0, y: 4, w: 1, h: 2 }}>
                <Drawerleft />
                <Drawerrigth />
            </div>
        )
    }
}
