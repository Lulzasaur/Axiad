import React, { Component } from 'react';

class ScrapeCard extends Component {
    
    //dummy site card which can be stylized later.
    render() {
        let style={
        }
    return (
            <div className="ScrapeCard card" style={style}>
            <div className="card-body">
                <p className="card-text">{this.props.url}</p>
                <p className="card-text">{this.props.image}</p>
            </div>
            </div>
    );
    }
}

export default ScrapeCard;