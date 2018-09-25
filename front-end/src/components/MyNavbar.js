import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "../axios";


class MyNavbar extends React.Component {
    state = {
        current: 'mail',
    }

    logout = () => {
        axios.delete('/api/auth')
            .then(data => window.location.reload())
            .catch(err => console.log(err))
    }

    collapseClick = () =>{
        let isShow = this.state.show;
        this.setState({show : !isShow});
    }


    render() {
        const render = this.props.username ?
            (
                <div className="loginButtonNav">
                    <Link to="/" className="ant-dropdown-link" className="navLink">View profile
                </Link>
                    <Link to="/login" onClick={this.logout} className="navLink">Logout</Link>
                </div>
            )
            : (
                (
                    <Link className="navLink" to="/login"> Login </Link>
                )
            )
        return (
            <div className="myNav">
                <div className={this.state.show ? "verNav" :"myNavLeft"}>
                    <i className="fas fa-bars collapse" onClick = {this.collapseClick} ></i>
                    <Link to="/" className="navLink">Home</Link>
                    <Link to="/" className="navLink" >Just now</Link>
                    <Link to="/" className="navLink" >Top 10</Link>
                    <Link to="/" className="navLink" >Top attribute user</Link>
                    {render}
                </div>
            </div>
        );
    }
}

export default MyNavbar;
