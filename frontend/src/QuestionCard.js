import React, { Component } from 'react';

class QuestionCard extends Component {
    
    //dummy Question card which can be stylized later.
    render() {
        let style={
        }
    return (
            <div className="QuestionCard card" style={style}>
            <div className="card-body">
                <p className="card-text">{this.props.question}</p>
            </div>
            </div>
    );
    }
    }

export default QuestionCard;