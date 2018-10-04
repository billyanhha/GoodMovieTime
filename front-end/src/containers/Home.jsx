import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
import Slide from '../components/Slider.jsx';
import TitleTag from '../components/TitleTag';


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
            <div className="container-fluid animation">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <Slide />
                <div className ="paddingResponsive ">
                    <TitleTag title = "Recommended list"/>
                </div>
            </div>
        )
    }
}

export default (Home);
