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
    this.viewDet = this.viewDet.bind(this)
  }

  //get the Purchase Orders from db. Update count from DB
  componentDidMount(){
    this.setState({
      pos: [[87, 3, "Aug 8, 2018", "Susan", 5423], [78, 2, "Aug 5, 2018", "Bobbi", 999], [51, 1, "Aug 1, 2018", "Richard", 124]],
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

  viewDet(){
    console.log('Now looking at PO Details')
    this.setState({
      view: 'details'
    })
  }

  render(){
    console.log(this.state.count)
    return(
      <div> 
        {this.state.view === 'createnew' && <NewPO poNum={this.state.count} savePO={this.savePO}/>}
        {this.state.view === 'details' && <ViewPO pos={this.props.pos}/>}
        {this.state.view === 'purchaseorder' && 
        <div>
          <h1> Dashboard </h1> 
          <button onClick={this.createNewPO}>Create New </button> 
          <h3> Purchase Orders </h3>
          <table>
            <thead>
              <tr>
                <th>PO</th>
                <th>Date</th>
                <th>Vendor</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pos.map((pop, index) => 
              <tr key={pop[0]} onClick={this.viewDet}>
              {pop.slice(1).map((po, index) => 
                <td key={index}> 
                  {po}
                </td>)}
              </tr>
              )}
            </tbody>
          </table>
        </div>}
      </div>
    )
  }
}

export default Dashboard;