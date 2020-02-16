import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import MyFirstGrid from './component/MyFirstGrid';
import Hello from './component/hello'
import Map from './component/map';
import styled from 'styled-components';
import Header from './component/header';
import CardItem from './component/CardItem';
import Prev from './component/12-prevent-collision';
import ReactGrid from './component/reactgridlayout';
import Circle from './component/circle';
import Head from './component/head';
import Mapdark from './component/mapdark'
import Websocket from './component/Websocket'
import TWS from './component/TWS'

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
      <TWS />

    </div>
    )
  }

}


