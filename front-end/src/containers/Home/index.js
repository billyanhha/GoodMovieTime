import React, { Component } from 'react';
import './Home.css';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.isLoggedin);

        const render = this.props.isLoggedin ?
            (
                <div>
                    <h3>Login roi</h3>
                </div>
            )
            : (<Redirect to="/login" />)
        return (
            <div>
                {render}
            </div>)
    }
}

export default Home;
