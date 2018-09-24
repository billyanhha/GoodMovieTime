import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';


class NonLoginHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: false,
        }
    }

    render() {
        return (
            <div className="loginHeader">
                <Link to='/' ><img src={logo} className="logoLogin" alt="Logo" /> </Link>
            </div>
        )
    }
}


export default NonLoginHeader;
