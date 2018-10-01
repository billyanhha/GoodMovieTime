import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo3.png';
// import watch from '../images/watch.jpg';
import { Dropdown, Menu, Icon } from 'antd';
import axios from "../axios";
// import iron from '../images/iron.png';
// import deadpool from '../images/deadpool.png';
// import batman from '../images/batman.png';
// import fight from '../images/fight.png';
// import cute from "../images/cute.png";


class Loader extends Component {

    render() {
        return (
            <div className="loaderDiv" >
                <div className="loader"></div>
            </div>
        )
    }
}

export default (Loader);
