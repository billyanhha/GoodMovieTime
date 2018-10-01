import React from 'react';
import { Link, Redirect } from "react-router-dom";
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

    toPostList = () => {
        this.setState({ toPostList: true })
    }


    render() {
        if (this.state.toPostList) {
            return <Redirect to="/post" />
        }
        const username = this.props.username;
        const render = username ?
            (
                <div className="loginButtonNav" >
                    <Link to={"/profile/" + this.props.id} className="ant-dropdown-link navLink" >View profile</Link>
                    <Link to="/login" onClick={this.logout} className="navLink">Logout</Link>
                    <Link to="/" className="navLink" > <i className="fas fa-search"></i></Link>
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
            <div className="myNav padding">
                <div className={this.state.show ? "verNav" : "myNavLeft"}>
                    <div className="collapseRow " >
                        {
                            this.props.username && (
                                <Link to="/" className=" collapse navLink blackCollapse" >hi, {this.props.username} </Link>
                            )
                        }
                        <i className="fas fa-bars collapse blackCollapse" onClick={this.collapseClick} ></i>
                    </div>
                    <Link to="/" className="navLink">Home</Link>
                    <Link to="/" className="navLink" >Just now</Link>
                    <Link to="/" className="navLink" >Top 10</Link>
                    <Link to="/" className="navLink" >About us</Link>
                    {username ? (
                        <Link to="/post"><button className="upListCollapse">Post<i className="fas fa-upload" style={{ marginLeft: '5px' }} ></i></button></Link>
                    ) : <div></div>}
                    {render}
                </div>
                <div className="myNavRight" >
                    <Link to="/" className="navLink" style={{ width: '100%', justifyContent: 'center', color: '#000' }} > <i className="fas fa-search"  ></i></Link>
                </div>
            </div>
        );
    }
}

export default MyNavbar;
