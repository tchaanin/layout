import React, { Component } from 'react'
import './App.css';
import styled from 'styled-components';
import Mapdark from './component/darkmap'
import Layout from './component/layout2'
import Map from './component/map'

const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
`;

const Container = styled.div`
`;


export default class App extends React.Component {

  render() {
    return (<div>
      <Map />
      <Layout />


    </div>
    )
  }

}


