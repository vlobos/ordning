import React from 'react';
import axios from 'axios';

class NewPO extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filler: '',
      projectList: '',
      projectName: '',
      projectId: '',
      vendorList: '',
      vendorName: '',
      vendorId: ''
    }
  this.autocompleteProjects = this.autocompleteProjects.bind(this)
  this.autocompleteVendors = this.autocompleteVendors.bind(this)
  this.postNewPO = this.postNewPO.bind(this)
  }

  componentDidMount(){
    this.getList(this.props.userId);
  };

  getList(id){
    let projectList = [];
    let vendorList = [];
    axios.get("/api/projects", { params: { userId: id } })
    .then((res) => {
      let project = res.data;
      project.forEach((listed) => {
        projectList.push([listed.id, listed.project])
      })
      this.setState({
        projectList: projectList
      })
    });

    axios.get("/api/vendors", { params: {userId: id} })
    .then((ven) => {
      let vendors = ven.data;
      vendors.forEach((listed) => {
        vendorList.push([listed.id, listed.vendor, listed.vendor_address, listed.phone, listed.email])
      })
      console.log(vendorList)
      this.setState({
        vendorList: vendorList
      })
    });
  };

  autocomplete(inp, arr) {
    console.log(arr, "Inside Autocomplete")
    let currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          console.log(arr[i][1], "string??")
          if (arr[i][1].substring(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i][1].substring(0, val.length) + "</strong>";
            b.innerHTML += arr[i][1].substring(val.length);
            b.innerHTML += "<input className='hiddenId' type='hidden' id='"+ arr[i][0]+ "' value='" + arr[i][1] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                inp.className = this.getElementsByTagName("input")[0].id;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  };

  autocompleteProjects(e){
    this.autocomplete(document.getElementById(e.target.id), this.state.projectList);
  };

  autocompleteVendors(e){
    this.autocomplete(document.getElementById(e.target.id), this.state.vendorList)
  };

  //updateProjectState and showState will eventually be deleted
  updateProjectState(){
    let projectName = document.getElementById('projInput').value;
    let projectId = document.getElementById('projInput').className;
    let vendorName = document.getElementById('vendorInput').value;
    let vendorId = document.getElementById('vendorInput').className;
    this.setState({
      projectName: projectName,
      projectId: projectId,
      vendorName: vendorName,
      vendorId: vendorId
    })
  };

  showState(){
    console.log(this.state.projectName, "project name", this.state.projectId, "project id", this.state.vendorName, "project vendor", this.state.vendorId, "vendor id")
  };

/*
postNewPO will take in:
poNumber -- x
user id --
poDate
total
sub
tax
shipcost
discount
note
vendor id
Project id
vendor name
project name
*/

  postNewPO(){
    //this.props.savePO();
    console.log("inpostnewpo")
    let shippingaddress = document.getElementById('shipto').value;

  }

  render(){
    return(
      <div> 
        <h2> New Purchase Order </h2>
        Purchase Order: {this.props.poNum}<br/>
        Date: {this.props.date}<br/>
        Project: 
        <form autoComplete="off">
          <div className="autocomplete" style={{width: "300px"}}>
            <input id="projInput" type="text" name="Project" placeholder="project" onChange={this.autocompleteProjects}></input>
          </div>
        </form>
        Vendor: 
        <form autoComplete="off">
          <div className="autocomplete" style={{width: "300px"}}>
            <input id="vendorInput" type="text" name="vendor" placeholder="Vendor" onChange={this.autocompleteVendors}></input>
          </div>
        </form>
        
        <button onClick={this.updateProjectState.bind(this)}>Update project state</button>
        <button onClick={this.showState.bind(this)}>Showproject state</button>

        <br/> 
        Ship To: <input id="shipto" type="text" name="ship" placeholder="Address" autoCorrect="off"/><br/>
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
        <button onClick={this.props.goBack}>Cancel</button>
        <button onClick={this.postNewPO}>Save</button>
      </div>
    )
  }
}

export default NewPO;

//save will be a post. PO needs to be updated
