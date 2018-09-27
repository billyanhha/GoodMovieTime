import React from 'react';
import { Link } from "react-router-dom";
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

    collapseClick = () => {
        let isShow = this.state.show;
        this.setState({ show: !isShow });
    }


    render() {
        const render = this.props.username ?
            (
                <div className="loginButtonNav">
                    <Link to={"/profile/" + this.props.id} className="ant-dropdown-link" className="navLink">View profile
                </Link>
                    <Link to="/login" onClick={this.logout} className="navLink">Logout</Link>
                </div>
            )
            : (
                (
                    <div className="loginButtonNav">
                        <Link className="navLink" to="/login"> Login </Link>
                    </div>
                )
            )
        return (
            <div className="myNav">
                <div className={this.state.show ? "verNav" : "myNavLeft"}>
                    <div className="collapseRow " >
                        {
                            this.props.username && (
                                <Link to="/" className=" collapse navLink whiteCollapse" >hi, {this.props.username} </Link>
                            )
                        }
                        <i className="fas fa-bars collapse whiteCollapse" onClick={this.collapseClick} ></i>
                    </div>
                    <Link to="/" className="navLink">Home</Link>
                    <Link to="/" className="navLink" >Just now</Link>
                    <Link to="/" className="navLink" >Top 10</Link>
                    <Link to="/" className="navLink" >Search</Link>
                    <Link to="/" className="navLink" >About Us</Link>
                    {render}
                </div>
            </div>
        );
    }
}

export default MyNavbar;
