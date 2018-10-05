import React, { Component } from 'react';

import pacman from '../images/ll.gif';

class Loader extends Component {

    render() {
        return (
            <div className="loaderDiv" >
                <img src={pacman} className="super" style ={{ height: '3vw' }} alt="Logo" />
            </div>
        )
    }
}

export default (Loader);
