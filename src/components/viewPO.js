import React from 'react';

const ViewPO = (props) => (
    <div> 
      <h2> Purchase Order: {props.dets[1]} </h2>
      Date: {props.dets[2]} <br/>
      Project: <input type="text" name="project" placeholder="Project" autoCorrect="off"/><br/>
      Vendor: {props.dets[3]} Ship To: <input type="text" name="ship" placeholder="Address" autoCorrect="off"/><br/>
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
            <td>Lamp</td>
            <td>Brushed brass floor lamp</td>
            <td>1</td>
            <td>700</td>
            <td>700</td>
          </tr>
          <tr>
            <td colSpan="4" style={{textAlign:"right"}}>Subtotal</td>
            <td>700</td>
          </tr>
          <tr>
            <td colSpan="2">Additional Notes</td>
            <td colSpan="2" style={{textAlign:"right"}}>Tax</td>
            <td>10%</td>
          </tr>
          <tr>
            <td colSpan="2" rowSpan="3"><textarea cols="90" rows="3"></textarea></td>
            <td colSpan="2" style={{textAlign:"right"}}>Shipping</td>
            <td>50</td>
          </tr>
          <tr>
            <td colSpan="2" style={{textAlign:"right"}}>Discount</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2" style={{textAlign:"right"}}>Total</td>
            <td>750</td>
          </tr>
        </tbody>
      </table>
      <button onClick={props.goBack}>Back</button>
    </div>
)

export default ViewPO;