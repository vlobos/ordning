import React from 'react';
import ViewPO from './viewPO';
import NewPO from './newPO'

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pos: [],
      view: 'purchaseorder',
    }
    this.createNewPO = this.createNewPO.bind(this)
  }

  componentDidMount(){

  }

  createNewPO(){
    console.log('hello cole')
    this.setState({
      view: 'createnew'
    })
  }

  render(){
    return(
      <div> 
        {this.state.view === 'createnew' ||
        <div> 
          <h1> Dashboard </h1> 
          <button onClick={this.createNewPO}>Create New </button> 
        </div>}
        {this.state.view === 'createnew' && <NewPO/>}
        {this.state.view === 'purchaseorder' && <div>
          <h3> Purchase Orders </h3>
            <ViewPO />
        </div>}
      </div>
    )
  }
}

export default Dashboard;