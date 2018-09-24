import React from 'react';
import { Navbar, NavDropdown, NavItem, MenuItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
class MyNavbar extends React.Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div className="myNav">
                <div className="myNavLeft">
                    <Link to="/" className="navLink" >Home</Link>
                    <Link to="/" className="navLink" >Just now</Link>
                    <Link to="/" className="navLink" >Top 10</Link>
                    <Link to="/" className="navLink" >Top attribute user</Link>
                </div>
            </div>
        );
    }
}

export default MyNavbar;
