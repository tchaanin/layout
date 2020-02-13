import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Drawerleft from './drawerleft';
import Drawerrigth from './drawerrigth';
import './header.css'
import FullscreenMode from './FullscreenMode';



export default class header extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Drawerleft />
                        </Grid>
                        <Grid item xs>
                            <FullscreenMode />
                        </Grid>

                        <Grid item xs >
                            <div className="itemRigth"> <Drawerrigth /></div>
                        </Grid>
                    </Grid>

                </div>
            </div>
        )
    }
}
