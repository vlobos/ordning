import React from 'react';

class Login extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div> 
        <h3> Login </h3>
          <input type="text" name="company" placeholder="Organization" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
          <input type="text" name="password" placeholder="Password" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
          <button onClick={this.props.onSubmit}>Login</button> 
      </div>
    )
  }
}

export default Login;