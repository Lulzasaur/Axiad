import React, { Component } from 'react';
import API from './API'
import ScrapeCard from './ScrapeCard'
import NewScrapeForm from './NewScrapeForm'

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      scrapes:[]
    };
    this.addScrape = this.addScrape.bind(this);
  }

  addScrape(scrapes) {
    this.setState({scrapes});
  }

  async componentDidMount() {
    
    let scrapes = await API.getAllScrapes();
    this.setState({scrapes})
  }

  render() {
    let scrapes = this.state.scrapes.map(item =>
      (   <div>
            <ScrapeCard
              key={item.id}
              url={item.url}
              image={item.largest_image}
              date={item.date}
              status={item.status}
            />
          </div>
      )
    );

    return (
      <div className="App">
        <NewScrapeForm handleNewScrape={this.addScrape} />
        <br></br>
        {scrapes}
      </div>
    );
  }
}

export default App;

