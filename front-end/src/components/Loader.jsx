import React, { Component } from 'react';

import pacman from '../images/ll.gif';

class Loader extends Component {

    render() {
        return (
            <div className="loaderDiv" >
                <div className="bigLoader"  ></div>
            </div>
        )
    }
}

export default (Loader);
