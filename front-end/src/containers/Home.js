import React, { Component } from 'react';
import Header from '../components/Header';
import MyNavbar from '../components/MyNavbar';
import Slide from '../components/Slider';

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
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <Slide />
                <div className="followUs" >
                    <p className="homeNormalText" >Follow us</p>
                    <div className="followIconDiv">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/SNAT-Movie-307717666625768/" ><i className="fab fa-facebook" style={{ color: '#4267B2' }} ></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/SNAT-Movie-307717666625768/" ><i className="fab fa-twitter" style={{ color: '#1DA1F2' }} ></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/SNAT-Movie-307717666625768/" ><i className="fab fa-instagram" style={{ color: '#C62E90' }}></i></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Home);
