import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { Input } from 'antd';
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

    render() {
        const render = this.props.username ?
            (
                <div className="loginButton">
                    <span className="normarlText" >Hello my friend , {this.props.username}</span>
                    <p className="normarlText" ><Link to="/login">View your profile </Link></p>
                </div>)
            : (
                (
                    <div className="loginButton">
                        <span className="normarlText" >You've not login yet ,<Link to="/login"> Login ?</Link></span>
                    </div>
                )
            )
        return (
            <div className="header">
                <div className="logoView">
                    <Link to='/' className="a" ><img src={logo} className="logo" alt="Logo" /> </Link>
                </div>
                <div className="input">
                    <Input.Search
                        placeholder="Type actor , movie , list name ... "
                        onSearch={value => console.log(value)}
                    />
                </div>
                {/* <div className="superheroLine">
                    <img src={spider} className="spider" alt="Logo" />
                    <img src={supers} className="super" alt="Logo" />
                    <img src={batman} className="super" alt="Logo" />
                    <img src={naruto} className="super" alt="Logo" />
                </div> */}
                {render}
            </div>
        )
    }
}

export default (Home);
