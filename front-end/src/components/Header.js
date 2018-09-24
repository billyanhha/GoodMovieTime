import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { Input, Dropdown, Button, Menu, Icon } from 'antd';
import axios from "../axios";
// import spider from '../images/spider.png';
// import supers from '../images/super.png';
// import batman from '../images/batman.png';
// import naruto from '../images/naruto.png';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentDidMount() {
    }

    logout = () => {
        axios.delete('/api/auth')
            .then(data => window.location.reload())
            .catch(err => console.log(err))
    }


    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Profile</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.logout} >Logout</a>
                </Menu.Item>
            </Menu>
        );
        const render = this.props.username ?
            (
                <div className="col-md-4 col-12 loginButton">
                    <span className="normarlText" >Hello my friend ,  </span>
                    <Dropdown overlay={menu}>
                        <Link to="/" className="ant-dropdown-link" className="link">{this.props.username} <Icon style={{position: 'absolute' , top: "20%"}} type="caret-down" theme="outlined" />
                        </Link>
                    </Dropdown>,
                </div>)
            : (
                (
                    <div className="col-md-4 col-12 loginButton">
                        <span className="normarlText" >You've not login yet ,<Link className="link" to="/login"> Login ?</Link></span>
                    </div>
                )
            )
        return (
            <div className="header row">
                <div className="col-md-4 col-12 logoView">
                    <Link to='/' className="link" ><img src={logo} className="logo" alt="Logo" /> </Link>
                </div>
                {render}
            </div>
        )
    }
}

export default (Home);
