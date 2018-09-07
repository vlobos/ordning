import React from 'react';

const ViewPO = (props) => (
    <div className="po"> 
      <div className="baselayer">
        <div className="layer tl"><h2>Purchase Order: {props.dets.po_num}</h2></div>
        <div className="layer tr"><h2>Date: {props.dets.date_created}</h2></div>
        <table className="layer tb">
          <tbody>
            <tr>
              <th className="viewdet">Vendor</th>
              <th className="filler"></th>
              <th className="viewdet">Ship To</th>
            </tr>
            <tr>
              <td className="poDet">{props.dets.vendor}</td>
              <td></td>
              <td className="poDet">{props.dets.ship_to}</td>
            </tr>
            <tr>
              <td className="poDet">{props.dets.vendor_address}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="poDet">{props.dets.email}</td>
              <td></td>
              <th className="viewdet">Project</th>
            </tr>
            <tr>
              <td className="poDet">{props.dets.phone}</td>
              <td></td>
              <td className="poDet">{props.dets.project}</td>
            </tr>
          </tbody>
        </table> 
      </div>
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
          <tr className="poDash" key={i}>
              {Object.keys(itemObj).map((col, i) => {
                return <td key={i} className={col}>
                {console.log(col)}
                  {itemObj[col]}
                </td>
              })}
            
          </tr>
          )}
          <tr>
            <td colSpan="4" className="tdtitle">Subtotal</td>
            <td className="moneyvalues">{props.dets.sub}</td>
          </tr>
          <tr>
            <td colSpan="2" className="tdtitlenotes">Additional Notes</td>
            <td colSpan="2" className="tdtitle">Tax</td>
            <td className="moneyvalues">{props.dets.tax}</td>
          </tr>
          <tr>
            <td colSpan="2" rowSpan="3" className="textarea">{props.dets.notes}</td>
            <td colSpan="2" className="tdtitle">Shipping</td>
            <td className="moneyvalues">{props.dets.shipping_cost}</td>
          </tr>
          <tr>
            <td colSpan="2" className="tdtitle">Discount</td>
            <td className="moneyvalues">{props.dets.discount}</td>
          </tr>
          <tr>
            <td colSpan="2" className="tdtitle">Total</td>
            <td className="moneyvalues">{props.dets.total}</td>
          </tr>
        </tbody>
      </table>
      <button className="newPO"onClick={props.goBack}>Back</button>
    </div>
)

export default ViewPO;