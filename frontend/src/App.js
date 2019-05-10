import React, { Component } from 'react';
import API from './API'
import ScrapeCard from './ScrapeCard'

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      url:'',
      scrapes:[]
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
    await API.addScrape(newScrape)

    //reset state so same information isnt submitted again
    this.setState({
      url:''
    })
  }

  async componentDidMount() {
    
    let scrapes = await API.getScrapes();
    console.log(scrapes)
    scrapes.list = scrapes.map(item=>{

      return (
        <div>
          <ScrapeCard
            key={item.id}
            url={item.url}
            image={item.largest_image}
          />
        </div>
      );
    });

    this.setState({ scrapes, isLoading: false });
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
        <br></br>
        {this.state.scrapes.list}
        <button>Submit</button>
       </form>
      </div>
    );
  }
}

export default App;

