import React from 'react';

const ViewPO = (props) => (
  <div> 
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
        {props.pos.map((pop, index) => 
        <tr key={index}>
        {pop.map((po, index) => 
          <td key={index}> 
            {po}
          </td>)}
        </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default ViewPO;