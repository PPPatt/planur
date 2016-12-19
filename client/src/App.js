import React, { Component } from 'react';
import logo from './logo.svg';
import fetch from 'node-fetch';
import './App.css';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    //console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blob: [],
    }
  }
  componentWillMount() {
    fetch('http://localhost:3000/api/events', {
      method: "GET",
      mode: "no-cors",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error)=>{console.log(error)})
      .then((response)=>{this.setState({blob: response})})
  }

  addProject() {
    var body = { title: 'stuff' };
    fetch('http://localhost:3000/api/event', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      mode: "no-cors",
      body: JSON.stringify(body)
    })
      .then((response)=>{
        console.log(response)
        return response
      })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error)=>{console.log(error)})
      .then(()=>console.log('hi'))
  }

  renderEventList() {
    let eventList = []
    for(let i=0; i<this.state.blob.length; i++) {
      let event = this.state.blob[i]
      eventList.push(<p key={i}>{event.title}</p>)
    }
    return eventList
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button onClick={this.addProject}>PressMe</button>
          {this.state.blob[0]&& this.state.blob[0].title?
            this.renderEventList():
            <p className="App-intro">... Loading</p>}
      </div>
    );
  }
}

export default App;
