import React from 'react';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      company: '',
      password: ''
    }
    this.typeCredentials = this.typeCredentials.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  typeCredentials(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    this.props.validateLogin(this.state.company, this.state.password);
  }


  render() {
    return (
      <div> 
        <h3> Login </h3>
          <input type="text" name="company" placeholder="Organization" onChange={this.typeCredentials}/><br/>
          <input type="text" name="password" placeholder="Password" onChange={this.typeCredentials}/><br/>
          <button onClick={this.onSubmit}>Login</button> 
      </div>
    )
  }
}

export default Login;