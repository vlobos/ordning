import React from 'react';
import ViewPO from './viewPO';
import NewPO from './newPO'

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pos: [],
      count: 0,
      view: 'dashboard',
      dets: ['Dummy ID','Dummy PO', 'Date', 'Vendor', 'Amount']
    }
    this.createNewPO = this.createNewPO.bind(this);
    this.savePO = this.savePO.bind(this)
    this.viewDet = this.viewDet.bind(this)
    this.goBack = this.goBack.bind(this)
    this.getPurchaseOrders = this.getPurchaseOrders.bind(this)
  }

  //get the Purchase Orders from db. Update count from DB
  componentDidMount(){
    console.log(this.props.user)
    this.getPurchaseOrders(this.props.user);
  }

  getPurchaseOrders(user){
    this.setState({
      pos: [[87, 3, "Aug 8, 2018", "Susan", 5423], [78, 2, "Aug 5, 2018", "Bobbi", 999], [51, 1, "Aug 1, 2018", "Richard", 124]],
      count: 3
    })
  }

  createNewPO(){
    this.setState({
      view: 'createnew'
    })
  }

  //savePO will post to database
  savePO(){
    this.setState({
      view: 'dashboard',
      count: this.state.count + 1
    })
  }

  goBack(){
    this.setState({
      view: 'dashboard'
    })
  }

  viewDet(key){
    console.log(key, "this SHOULD be the id")
    let pos= this.state.pos;
    let dets = ''
    for(let i = 0; i < pos.length; i++){
      if (pos[i][0]=== key){
        dets = pos[i]
      }
    }
    this.setState({
      view: 'details',
      dets: dets
    })
  }

  render(){
    return(
      <div> 
        {this.state.view === 'createnew' && <NewPO poNum={this.state.count} savePO={this.savePO}/>}
        {this.state.view === 'details' && <ViewPO dets={this.state.dets} goBack={this.goBack}/>}
        {this.state.view === 'dashboard' && 
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
              {this.state.pos.map((pop) => 
              <tr key={pop[0]} onClick={() => this.viewDet(pop[0])}>
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