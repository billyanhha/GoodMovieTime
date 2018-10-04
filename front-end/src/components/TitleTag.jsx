import React, { Component } from 'react';

class TitleTag extends Component {

    render() {
        return (
            <div className="titleTag">
                <p className = "title" >{this.props.title}</p>
            </div>
        )
    }
}

export default (TitleTag);
