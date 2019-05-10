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

  //function to change state in parent. will be passed down as props
  addScrape(scrapes) {
    this.setState({scrapes});
  }

  //load up scrape data on first load
  async componentDidMount() {
    let response = await API.getAllScrapes(),
        scrapes = response.data
    
    this.setState({scrapes})
  }

  render() {
    //render scrapecards from state
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

