import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './containers/Home';
import axios from './axios';
import Login from './containers/Login';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:6969/api/auth').then(
      data => data.data && this.setState({ isLoggedin: true })
    ).catch(err => console.log(err))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' render={(props) => {
            return <Home {...props} isLoggedin={this.state.isLoggedin} />
          }} />
          <Route path='/login' render={(props) => {
            return <Login {...props} />
          }} /></div>
      </BrowserRouter>
    );
  }
}

export default App;
