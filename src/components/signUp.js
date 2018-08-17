import React from 'react';

class SignUp extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div> 
        <h3> Sign Up </h3>
          {this.props.dupe === 'on' && <div>Username is taken! Choose another!</div> }
          <input type="text" name="company" placeholder="Organization" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
          <input type="text" name="password" placeholder="Password" autoComplete="off" onChange={this.props.typeCredentials}/><br/>
          <button onClick={this.props.onCreate}>Sign Up</button> 
      </div>
    )
  }
}

export default SignUp;

//on sign up you need to make sure Organization name is unique. if it is, create new user with org name and password