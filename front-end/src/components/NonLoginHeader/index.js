import React, { Component } from 'react';
import './NonLoginHeader.css';
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'

class NonLoginHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
        }
    }

    render() {
        return (
            <div className="header">
                <Link to='/' ><img src={logo} className="logo" alt="Logo" /> </Link>
            </div>
        )
    }
}


export default NonLoginHeader;
