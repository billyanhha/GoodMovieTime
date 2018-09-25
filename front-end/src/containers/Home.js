import React, { Component } from 'react';
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
                <MyNavbar username={this.props.username}  />
            </div>
        )
    }
}

export default (Home);
