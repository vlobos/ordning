import React from 'react';
import ViewPO from './viewPO';
import NewPO from './newPO'

class Dashboard extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div> 
        <h1> Dashboard </h1>
        <button>Create New </button>
        <NewPO />
        <div>
          <h3> Purchase Orders </h3>
            <ViewPO />
        </div>
      </div>
    )
  }
}

export default Dashboard;