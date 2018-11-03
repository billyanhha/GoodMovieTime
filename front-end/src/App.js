import React, { Component } from 'react';
import './App.css';
import './PhoneApp.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './containers/Home.jsx';
import axios from './axios';
import Login from './containers/Login.jsx';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import SignUp from './containers/SignUp.jsx';
import Profile from './containers/Profile.jsx';
import TopList from './containers/TopList';
import JustNow from './containers/JustNow';
import ListDetail from './containers/ListDetail';
import Search from './containers/Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id: '',
    }
  }

  componentDidMount() {
    axios.get('/api/auth').then(
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
            return <Home {...props} username={this.state.username} id={this.state.id} />
          }} />
          <Route path='/login' render={(props) => {
            return <Login {...props} onLogin={this.onLogin} />
          }} />
          <Route path='/signUp' render={(props) => {
            return <SignUp {...props} />
          }} />
          <Route  path='/profile/:id' render={(props) => {
            return <Profile {...props} username={this.state.username} id={this.state.id} />
          }} />
          <Route path='/top' render={(props) => {
            return <TopList {...props} username={this.state.username} id={this.state.id} />
          }} />
          <Route path='/justNow' render={(props) => {
            return <JustNow {...props} username={this.state.username} id={this.state.id} />
          }} />
          <Route path='/lists/:id' render={(props) => {
            return <ListDetail {...props} username={this.state.username} id={this.state.id} />
          }}/>
          <Route exact path={`/profilec/:id`} render={(props) => {
            return <Profile {...props} username={this.state.username} id={this.state.id} />
          }}/>
          <Route exact path={`/search`} render={(props) => {
            return <Search {...props} username={this.state.username} id={this.state.id} />
          }}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
