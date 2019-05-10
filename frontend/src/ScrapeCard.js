import React, { Component } from 'react';

class ScrapeCard extends Component {
    
    //dummy site card which can be stylized later.
    render() {
        let style={
        }
    return (
            <div className="ScrapeCard card" style={style}>
                <div className="card-body">
                    <p className="card-text">URL:{this.props.url}</p>
                    <p className="card-text">IMAGE URL:{this.props.image}</p>
                    <p className="card-text">DATE:{this.props.date}</p>
                    <p className="card-text">SCRAPE STATUS:{this.props.status}</p>
                </div>
            </div>
    );
    }
}

export default ScrapeCard;