import React from 'react';

class NewPO extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div> 
        <h2> New Purchase Order </h2>
        Purchase Order: {this.props.poNum}<br/>
        Project: <input type="text" name="project" placeholder="Project" autoCorrect="off"/><br/>
        Vendor: <input type="text" name="vendor" placeholder="Vendor" autoCorrect="off"/> Ship To: <input type="text" name="ship" placeholder="Address" autoCorrect="off"/><br/>
        <table cellSpacing="0" cellPadding="0" style={{width:"800px"}}>
          <thead>
            <tr>
              <th style={{width:"10%"}}>Item</th>
              <th style={{width:"50%"}}>Description</th>
              <th style={{width:"5%"}}>QTY</th>
              <th style={{width:"7%"}}>Unit Price</th>
              <th style={{width:"5%"}}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="4" style={{textAlign:"right"}}>Subtotal</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2">Additional Notes</td>
              <td colSpan="2" style={{textAlign:"right"}}>Tax</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" rowSpan="3"><textarea cols="90" rows="3"></textarea></td>
              <td colSpan="2" style={{textAlign:"right"}}>Shipping</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{textAlign:"right"}}>Discount</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{textAlign:"right"}}>Total</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.props.savePO}>Save</button>
      </div>
    )
  }
}

export default NewPO;

//save will be a post. PO needs to be updated
