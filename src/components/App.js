import React, { Component } from 'react';
import Login from './login';
import SignUp from './signUp';
import Dashboard from './dashboard';
import axios from 'axios';
import '../index.css'

class App extends Component {
  constructor(){
    super();
    this.state = {
      view: '',
      dupe: 'off',
      userId: ''
    }
    this.validateLogin = this.validateLogin.bind(this);
    this.createUser = this.createUser.bind(this);
    this.typeCredentials = this.typeCredentials.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.signUp = this.signUp.bind(this)

  }

  componentDidMount(){
    this.setState({
      view: 'login'
    })
  }

  validateLogin(username, password){
    axios.get('/api/login/'+ username, { params: {
      pass: password
    }})
      .then((res) => {
        if (res.data.length === 0){
          this.setState({
            view: 'signup'
          })
        } else {
          let userId = res.data[0].id;
          this.setState({
            view: 'dashboard',
            userId: userId
          })
        }
      })
      .catch((err) => {
        console.log('Failure')
      })
  }

  signUp() {
    this.setState({
      view: 'signup'
    })
  }

  createUser(username, password){
    //check if username is available
    //if available, post
    //set state to login
    //if not sign up again
    if (username === 'Cole'){
      this.setState({
        view: 'login'
      })
    } else if (username === 'Sury'){
      this.setState({
        view: 'signup',
        dupe: 'on'
      })
    }
  }

  typeCredentials(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCreate(e){
    this.createUser(this.state.company, this.state.password);
  }

  onSubmit(e){
    this.validateLogin(this.state.company, this.state.password);
  }

  render() {
    return (
      <div className="App">
        
        <div>
        {this.state.view === 'login' && <Login validateLogin={this.validateLogin} typeCredentials={this.typeCredentials} onSubmit={this.onSubmit} signUp={this.signUp}/> ||
        this.state.view === 'signup' && <SignUp dupe={this.state.dupe} createUser={this.createUser} typeCredentials={this.typeCredentials} onCreate={this.onCreate}/> || 
        this.state.view === 'dashboard' && <Dashboard user={this.state.company} userId={this.state.userId}/>}
        </div>
      </div>
    );
  }
}

export default App;
