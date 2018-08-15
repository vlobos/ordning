import React from 'react';

class NewPO extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div> 
        <h2> New Purchase Order </h2>
        Purchase Order: <input type="text" name="number" placeholder="P.O." autoCorrect="off"/> Date: <input type="text" name="date" placeholder="Date" autoCorrect="off"/><br/>
        Project: <input type="text" name="project" placeholder="Project" autoCorrect="off"/><br/>
        Vendor: <input type="text" name="vendor" placeholder="Vendor" autoCorrect="off"/> Ship To: <input type="text" name="ship" placeholder="Address" autoCorrect="off"/><br/>
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th style={{width:"10%"}}>Item</th>
              <th style={{width:"50%"}}>Description</th>
              <th style={{width:"5%"}}>QTY</th>
              <th style={{width:"5%"}}>Unit</th>
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
              <td colSpan="4" style={{"text-align":"right"}}>Subtotal</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{"text-alight":"center"}}>Additional Notes</td>
              <td colSpan="2" style={{"text-align":"right"}}>Tax</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" rowSpan="3"><textarea cols="90" rows="3"></textarea></td>
              <td colSpan="2" style={{"text-align":"right"}}>Shipping</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{"text-align":"right"}}>Discount</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{"text-align":"right"}}>Total</td>
              <td><input type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
          </tbody>
        </table>
        <button>Save</button>
      </div>
    )
  }
}

export default NewPO;
