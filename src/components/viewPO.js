import React from 'react';

const ViewPO = (props) => (
    <div className="po"> 
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
      <table className="dashtable">
        <thead>
          <tr>
            <th className="item">Item</th>
            <th className="desc">Description</th>
            <th className="qty">QTY</th>
            <th className="amount">Unit Price</th>
            <th className="amount">Amount</th>
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
      <button className="newPO"onClick={props.goBack}>Back</button>
    </div>
)

export default ViewPO;