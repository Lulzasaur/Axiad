import React, { Component } from 'react';
import API from './API'
import QuestionCard from './QuestionCard'

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      name:'',
      email:'',
      questions: [],
      answers:[]
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleAnswers = this.handleAnswers.bind(this);

  }

  //function for changing state from various form inputs
  handleChange(evt) {

    this.setState({ [evt.target.name]: evt.target.value });

  }

  //special function for changing state for answer fields. Answer fields use a numeric id identifier.
  handleAnswers(evt){

    let position = evt.target.name,
        answerArr = [...this.state.answers]
      
    answerArr[position]=evt.target.value

    this.setState({ answers: [...answerArr] });
  }

  async handleSubmit(evt) {

    evt.preventDefault();
    let user = {
      name: this.state.name,
      email: this.state.email,
      questions:[]
    };

    for(let i=1;i<this.state.answers;i++){
        let temp ={answer:this.state.answers[i],id:[i]}
        user.questions.push(temp)
    }

    //reset form
    this.formRef.reset()

    //reset state so same information isnt submitted again
    this.setState({
      name:'',
      email:'',
      answers:[]
    })

    //send data to database
    await API.addUser(user)
  }

  async componentDidMount() {
    
    let questions = await API.getQuestions();
    
    questions.list = questions.map(item=>{

      return (
        <div>
          <QuestionCard
            key={item.id}
            question={item.question}
          />
          <input
            type="text"
            id={item.id}
            name={item.id}
            onChange={this.handleAnswers}
            value={this.state.answers[item.id]}
          />
        </div>
      );
    });

    this.setState({ questions, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} method='post' ref={(el) => this.formRef = el}>
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            name='name'
            onChange={this.handleChange}
            value={this.state.name}
          />
        <br></br>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name='email'
          onChange={this.handleChange}
          value={this.state.email}
        />
        {this.state.questions.list}
        <button>Submit</button>
       </form>
      </div>
    );
  }
}

export default App;

