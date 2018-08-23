import React from 'react';

const ViewPO = (props) => (
    <div> 
      <h2> Purchase Order: {props.dets.po_num} </h2>
      Date: {props.dets.date_created} <br/>
      Project: {props.dets.project} <br/>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Ship To:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.dets.vendor}</td>
            <td>Recepient at</td>
          </tr>
          <tr>
            <td>{props.dets.vendor_address}</td>
            <td>{props.dets.ship_to}</td>
          </tr>
          <tr>
            <td>{props.dets.email}</td>
            <td></td>
          </tr>
          <tr>
            <td>{props.dets.phone}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    <br/>
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
          {props.lineItems.map((itemObj, i) =>
          <tr key={i}>
            {Object.keys(itemObj).map((col, i) => {
              return <td key={i}>
                {itemObj[col]}
              </td>
            })}
          </tr>
          )}
          <tr>
            <td colSpan="4" style={{textAlign:"right"}}>Subtotal</td>
            <td>{props.dets.sub}</td>
          </tr>
          <tr>
            <td colSpan="2">Additional Notes</td>
            <td colSpan="2" style={{textAlign:"right"}}>Tax</td>
            <td>{props.dets.tax}</td>
          </tr>
          <tr>
            <td colSpan="2" rowSpan="3">{props.dets.notes}</td>
            <td colSpan="2" style={{textAlign:"right"}}>Shipping</td>
            <td>{props.dets.shipping_cost}</td>
          </tr>
          <tr>
            <td colSpan="2" style={{textAlign:"right"}}>Discount</td>
            <td>{props.dets.discount}</td>
          </tr>
          <tr>
            <td colSpan="2" style={{textAlign:"right"}}>Total</td>
            <td>{props.dets.total}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={props.goBack}>Back</button>
    </div>
)

export default ViewPO;