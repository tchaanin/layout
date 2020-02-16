import React, { Component } from 'react'
import './CardItem.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Websocket from './Websocket';

export default class CardItem extends Component {

    constructor(props) {

    }

    updateThis() {
        this.props.onchangeValue(this.state.value)
    }


    render() {
        return (
            <div className="ContainerWrapper">

                <div className="topBar">
                    <div class="row">
                        <div class="col">
                            TWS                         </div>
                        <div class="col2">
                            @
                        </div>

                    </div>

                </div>
                <div className="midBar" >3</div>
                <div className="botBar">
                    <div class="row">
                        <div class="col">
                            True Wind Speed                      </div>
                        <div class="col4">
                            2 of 2
                             </div>

                    </div>

                </div>

            </div>
        )
    }
}
