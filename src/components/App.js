import React, { Component } from 'react';
import Login from './login';
import SignUp from './signUp';
import Dashboard from './dashboard';


class App extends Component {
  constructor(){
    super();
    this.state = {
      view: '',
      dupe: 'off'
    }
    this.validateLogin = this.validateLogin.bind(this);
    this.createUser = this.createUser.bind(this)
    this.typeCredentials = this.typeCredentials.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }

  componentDidMount(){
    this.setState({
      view: 'login'
    })
  }

  validateLogin(username, password){
    if (username === 'Sury'){
      this.setState({
        view: 'dashboard'
      })
    } else {
      this.setState({
        view: 'signup'
      })
    }
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
        <header className="App-header">
        <h1 className="App-title">ORDNING</h1>
        </header>
        <div>
        {this.state.view === 'login' && <Login validateLogin={this.validateLogin} typeCredentials={this.typeCredentials} onSubmit={this.onSubmit}/> ||
        this.state.view === 'signup' && <SignUp dupe={this.state.dupe} createUser={this.createUser} typeCredentials={this.typeCredentials} onCreate={this.onCreate}/> || 
        this.state.view === 'dashboard' && <Dashboard/>}
        </div>
      </div>
    );
  }
}

export default App;
