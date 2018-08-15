import React from 'react';

// class ViewPO extends React.Component{
//   constructor(props){
//     super(props);
//   }

//   render(){
//     return(
//       <div> View Purchase Order </div>
//     )
//   }
// }

const ViewPO = (props) => (
  <div> 
    {props.pos.map((pop, index) => 
      <li key={index}> {console.log(pop)} 
      {pop.map((po, index) => 
        <span key={index}> 
          {po}. 
        </span>)}
      </li>
    )}
  </div>
)

export default ViewPO;