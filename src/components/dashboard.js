import React from 'react';
import ViewPO from './viewPO';
import NewPO from './newPO'

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pos: [],
      count: 0,
      view: 'purchaseorder',
    }
    this.createNewPO = this.createNewPO.bind(this);
    this.savePO = this.savePO.bind(this)
  }

  //get the Purchase Orders from db. Update count from DB
  componentDidMount(){
    this.setState({
      pos: [[3, "Aug 8, 2018", "Susan", 5423], [2, "Aug 5, 2018", "Bobbi", 999], [1, "Aug 1, 2018", "Richard", 124]],
      count: 3
    })
  }

  createNewPO(){
    console.log('hello cole')
    this.setState({
      view: 'createnew'
    })
  }

  //savePO will post to database
  savePO(){
    this.setState({
      view: 'purchaseorder',
      count: this.state.count + 1
    })
  }

  render(){
    console.log(this.state.count)
    return(
      <div> 
        {this.state.view === 'createnew' ||
        <div> 
          <h1> Dashboard </h1> 
          <button onClick={this.createNewPO}>Create New </button> 
        </div>}
        {this.state.view === 'createnew' && <NewPO poNum={this.state.count} savePO={this.savePO}/>}
        {this.state.view === 'purchaseorder' && <div>
          <h3> Purchase Orders </h3>
            <ViewPO pos={this.state.pos}/>
        </div>}
      </div>
    )
  }
}

export default Dashboard;