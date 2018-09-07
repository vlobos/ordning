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
      lineItems: '',
      date: ''
    }
    this.createNewPO = this.createNewPO.bind(this);
    this.updateCount = this.updateCount.bind(this)
    this.viewDet = this.viewDet.bind(this)
    this.goBack = this.goBack.bind(this)
    this.getPurchaseOrders = this.getPurchaseOrders.bind(this)
  }

  componentDidMount(){
    this.getPurchaseOrders(this.props.userId);
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

  getDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    today = mm + '/' + dd + '/' + yyyy;
    this.setState({
      date: today
    })
  }

  createNewPO(){
    this.getDate();
    this.setState({
      view: 'createnew'
    })
  }

  updateCount(poNum, id){
    this.setState({
      view: 'dashboard',
      count: poNum
    })
    this.getPurchaseOrders(id)
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
        {this.state.view === 'createnew' && <NewPO poNum={this.state.count+1} date={this.state.date} userId={this.props.userId} updateCount={this.updateCount} goBack={this.goBack}/>}
        {this.state.view === 'details' && <ViewPO dets={this.state.dets} lineItems={this.state.lineItems} goBack={this.goBack}/>}
        {this.state.view === 'dashboard' && 
        
        <div className="container">
          <h3> PURCHASE ORDERS</h3>
          <div className="po existing">
            <table className="dashtable">
              <thead>
                <tr>
                  <th className="first"></th>
                  <th className="po_num">PO</th>
                  <th className="date_created">Date</th>
                  <th className="vendor">Vendor</th>
                  <th className="total">Amount</th>
                  <th className="last"></th>
                </tr>
              </thead>
              <tbody>
                  {this.state.pos.map((poObj) =>
                  <tr className="poDash" key={poObj.id} onClick={()=>this.viewDet(poObj.id)}>
                    <td className="first"></td>
                      {Object.keys(poObj).slice(1).map((item, column) =>{
                        return <td key={column} className={item}>
                        {poObj[item]}
                        </td>
                      })}
                    <td className="last"></td>
                  </tr>
                  )}
              </tbody>
            </table>
            <button className="createNew" onClick={this.createNewPO}>Create New </button> 
          </div>
        </div>}

      </div>
    )
  }
}

export default Dashboard;
