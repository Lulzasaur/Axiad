import React, { Component } from 'react';
import API from './API'

class NewScrapeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  //function for changing state from various form inputs
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {

    evt.preventDefault();

    let newScrape = {
      url: this.state.url,
    };

    //send data to database
    API.addScrape(newScrape)
    
    //get all scrapes from database
    setTimeout(async ()=>{
        await API.getAllScrapes().then((resp)=>{
            console.log(resp)
            this.props.handleNewScrape(resp)
        });   
    },2000)
    
    //reset state so same information isnt submitted again
    this.setState({
      url:''
    })

  }

  async componentDidMount() {  
  
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} method='post' ref={(el) => this.formRef = el}>
        <label htmlFor="url">URL:</label>
        <input
            type="text"
            name='url'
            onChange={this.handleChange}
            value={this.state.url}
          />
        <button>Submit</button>
       </form>
      </div>
    );
  }
}

export default NewScrapeForm;

