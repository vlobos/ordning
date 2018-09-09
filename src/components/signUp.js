import React from 'react';

class SignUp extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">SIMPO</h1>
          <p>purchase orders simplified</p>
        </header>
        <div className="credentials sign">  
          <h3>SIGN UP</h3>
            {this.props.dupe === 'on' && <div>Username is taken! Choose another!</div> }
            <input id="testid" className="cred" type="text" name="company" placeholder="Organization" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
            <input className="cred" type="password" name="password" placeholder="Password" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
            <button onClick={this.props.onCreate}>Sign Up</button> 
        </div>
      </div>
    )
  }
}

export default SignUp;
