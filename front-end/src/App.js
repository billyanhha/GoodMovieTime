import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './containers/Home.js';
import axios from './axios';
import Login from './containers/Login.js';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import SignUp from './containers/SignUp';
import Profile from './containers/Profile';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:6969/api/auth').then(
      data => {
        if (data.data) {
          this.setState({ username: data.data.username, id: data.data.id })
        }
      }
    ).catch(err => console.log(err))
  }

  onLogin = (user) => {
    this.setState(user)
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' render={(props) => {
            return <Home {...props} username={this.state.username} id = {this.state.id} />
          }} />
          <Route path='/login' render={(props) => {
            return <Login {...props} onLogin={this.onLogin} />
          }} />
          <Route path='/signUp' render={(props) => {
            return <SignUp {...props} />
          }} />
          <Route path='/profile/:id' render={(props) => {
            return <Profile {...props} username={this.state.username} id = {this.state.id} />
          }} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
