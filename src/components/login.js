import React from 'react';

class Login extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">SIMPO</h1>
          <p>purchase orders simplified</p>
        </header>
        <div className="credentials"> 
          <h3> LOGIN </h3>
            <input className="cred" type="text" name="company" placeholder="Organization" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
            <input className="cred" type="text" name="password" placeholder="Password" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
            <button onClick={this.props.onSubmit}>Login</button><br/>
            <button onClick={this.props.signUp}>Sign Up</button> 
        </div>
      </div>
    )
  }
}

export default Login;