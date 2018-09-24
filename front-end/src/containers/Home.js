import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import MyNavbar from '../components/MyNavbar';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        this.setState({ username: this.props.username });
    }

    render() {
        return (
            <div className="containLayout">
                <Header username={this.props.username} />
                <MyNavbar />
            </div>
        )
    }
}

export default (Home);
