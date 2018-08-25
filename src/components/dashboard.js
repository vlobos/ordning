import React from 'react';
import ViewPO from './viewPO';
import NewPO from './newPO';
import axios from 'axios';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pos: [],
      count: 0,
      view: 'dashboard',
      dets: '',
      lineItems: ''
    }
    this.createNewPO = this.createNewPO.bind(this);
    this.savePO = this.savePO.bind(this)
    this.viewDet = this.viewDet.bind(this)
    this.goBack = this.goBack.bind(this)
    this.getPurchaseOrders = this.getPurchaseOrders.bind(this)
  }

  componentDidMount(){
    this.getPurchaseOrders(this.props.id);
  }
  
  getPurchaseOrders(id){
    axios.get('/api/dashboard/' + id)
    .then((res)=> {
      let pos = res.data;
      let count = res.data[0].po_num
      this.setState({
        pos: pos,
        count: count
      })
    })
    .catch((err)=>{
      if (err){
        console.log(err)
      }
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
  //get PO details
    axios.get('/api/po/'+ key)
    .then((res)=> {
      let dets = res.data[0];
      //get PO line items
      axios.get('api/lineitems', {params: { poId: key }})
      .then((res)=>{
        let items = res.data;
        this.setState({
          view: 'details',
          dets: dets,
          lineItems: items
        })
      })
      .catch((err)=>{
        if (err){
          console.log(err)
        }
      })
    })
    .catch((err)=>{
      if(err){
        console.log(err)
      }
    });
  }

  render(){
    return(
      <div> 
        {this.state.view === 'createnew' && <NewPO poNum={this.state.count+1} savePO={this.savePO} goBack={this.goBack}/>}
        {this.state.view === 'details' && <ViewPO dets={this.state.dets} lineItems={this.state.lineItems} goBack={this.goBack}/>}
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
                {this.state.pos.map((poObj) =>
                <tr key={poObj.id} onClick={()=>this.viewDet(poObj.id)}>
                  {Object.keys(poObj).slice(1).map((item, column) =>{
                    return <td key = {column}>
                    {poObj[item]}
                    </td>
                  })}
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
