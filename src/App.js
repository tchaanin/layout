import React, { Component } from 'react'
import './App.css';
import styled from 'styled-components';
import Mapdark from './component/atom/DarkMap'
import Layout from './component/organisms/layout/layout2'
import Map from './component/atom/map'
import DarkMap from './component/atom/DarkMap'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
`;

const Container = styled.div`
`;


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      showLayout: true,
      showMap: true
    };
  }

  toggleChange = () => {
    this.setState({
      isDarkMode: !this.state.isDarkMode,
    });
  }

  toggleChangeLayout = () => {
    this.setState({
      showLayout: !this.state.showLayout,
    });
  }

  toggleChangeMap = () => {
    this.setState({
      showMap: !this.state.showMap,
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            left: "80%",
            top: "0%",
            height: "20%",
            width: "20%",
            margin: "0 auto",
            zIndex: 400
          }}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isDarkMode}
                  onChange={this.toggleChange}
                  color="primary"
                />
              }
              label="Dark Mode"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.showLayout}
                  onChange={this.toggleChangeLayout}
                  color="primary"
                />
              }
              label="Layout"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={this.state.showMap}
                  onChange={this.toggleChangeMap}
                  color="primary"
                />
              }
              label="map"
            />

          </FormGroup>
        </div>

        {
          this.state.showMap ? this.state.isDarkMode ? <DarkMap> </DarkMap> : <Map /> : <div />
        }



        <div style={{
          top: "5%!important",
        }}>
          {
            this.state.showLayout ? <Layout isDarkMode={this.state.isDarkMode} /> : <div />
          }
        </div>

      </div>
    )
  }

}


