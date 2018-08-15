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

  //get the Purchase Orders from db
  componentDidMount(){
    this.setState({
      pos: [[3, "Susan", 5423, 5423], [2, "Bobbi", 999, 999], [1, "Richard", 124, 124]]
    })
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
            <ViewPO pos={this.state.pos}/>
        </div>}
      </div>
    )
  }
}

export default Dashboard;