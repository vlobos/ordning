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

  autocomplete(inp, add, em, ph, arr) {
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
          if (arr[i][1].substring(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i][1].substring(0, val.length) + "</strong>";
            b.innerHTML += arr[i][1].substring(val.length);
            b.innerHTML += "<input className='hiddenId' type='hidden' id='"+ arr[i][0]+ "' value='" + arr[i][1] + "'>";
            b.innerHTML += "<input id='addressId' type='hidden' value='" + arr[i][2] + "'>";
            b.innerHTML += "<input id='phoneId' type='hidden' value='" + arr[i][3] + "'>";
            b.innerHTML += "<input id='emailId' type='hidden' value='" + arr[i][4] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                inp.className = this.getElementsByTagName("input")[0].id;
                
                if (add != null && em != null && ph != null){
                  add.value = this.getElementsByTagName("input")[1].value;
                  em.value = this.getElementsByTagName("input")[2].value;
                  ph.value = this.getElementsByTagName("input")[3].value;
                }
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
    this.autocomplete(document.getElementById(e.target.id), null, null, null, this.state.projectList);
  };

  autocompleteVendors(e){
    let inp = document.getElementById(e.target.id);
    let add = document.getElementById("address");
    let ph = document.getElementById("phone");
    let em = document.getElementById("email");
    this.autocomplete(inp, add, ph, em, this.state.vendorList)
  };

  //postVendorProject
  postVendorProject(id, vendorName, vendorId, vendorAdd, phone, email, projectName, projectId, poNum, date, total, sub, tax, shipCost, discount, notes, shipTo) {

    if(!vendorId && !projectId) {
      console.log("no vendor or project id")
      axios.post("/api/vendors",  { params: { 
        userId: id,
        vendor: vendorName,
        address: vendorAdd,
        phone: phone,
        email: email  
        } 
      })
      .then((response) => {
        axios.post("/api/projects", { params: {
          project: projectName,
          userId: id
          }
        })
        .then((response) => {
          axios.post("/api/dashboard/" + id, { params: {
            poNum: poNum,
            userId: id,
            date: date,
            total: total,
            sub: sub,
            tax: tax,
            shipCost: shipCost,
            discount: discount,
            notes: notes,
            shipTo: shipTo,
            vendorId: vendorName,
            projectId: projectName
          } 
        })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
    };

    if(!vendorId) {
      console.log("no vendor id")
      axios.post("/api/vendors",  { params: { 
        userId: id,
        vendor: vendorName,
        address: vendorAdd,
        phone: phone,
        email: email  
        } 
      })
      .then((response) => {
        axios.post("/api/dashboard/" + id, { params: {
          poNum: poNum,
          userId: id,
          date: date,
          total: total,
          sub: sub,
          tax: tax,
          shipCost: shipCost,
          discount: discount,
          notes: notes,
          shipTo: shipTo,
          vendorId: vendorName,
          projectId: projectName
        } 
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err)
      })
    };

    if(!projectId) {
      console.log("no project id")
      axios.post("/api/projects", { params: {
        project: projectName,
        userId: id
        }
      })
      .then((response) => {
        axios.post("/api/dashboard/" + id, { params: {
          poNum: poNum,
          userId: id,
          date: date,
          total: total,
          sub: sub,
          tax: tax,
          shipCost: shipCost,
          discount: discount,
          notes: notes,
          shipTo: shipTo,
          vendorId: vendorName,
          projectId: projectName
          } 
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }

    if(vendorId && projectId){
      console.log("ProjectId is: ", projectId, ". VendorId is: ", vendorId)
      axios.post("/api/dashboard/" + id, { params: {
        poNum: poNum,
        userId: id,
        date: date,
        total: total,
        sub: sub,
        tax: tax,
        shipCost: shipCost,
        discount: discount,
        notes: notes,
        shipTo: shipTo,
        vendorId: vendorName,
        projectId: projectName
        } 
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  };

  updateProjectState(){
    let id = this.props.userId;
    let date = this.props.date;
    let poNum = this.props.poNum;
    //for postProject
    let projectName = document.getElementById('projInput').value;
    let projectId = document.getElementById('projInput').className || null
    //for postVendor
    let vendorName = document.getElementById('vendorInput').value;
    let vendorId = document.getElementById('vendorInput').className || null
    let vendorAdd = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    //for postPO
    let total = document.getElementById('total').value;
    let sub = document.getElementById('subtotal').value;
    let tax = document.getElementById('tax').value;
    let shipCost = document.getElementById('shipcost').value;
    let discount = document.getElementById('discount').value;
    let notes = document.getElementById('notes').value;
    let shipTo = document.getElementById('shipto').value;
    //for postLI

    this.setState({
      projectName: projectName,
      projectId: projectId,
      vendorName: vendorName,
      vendorId: vendorId,
      vendorAdd: vendorAdd,
      phone: phone,
      email: email
    }, function() {
    this.postVendorProject(id, vendorName, vendorId, vendorAdd, phone, email, projectName, projectId, poNum, date, total, sub, tax, shipCost, discount, notes, shipTo)
    })
  };

  showState(){
    console.log(this.state)
  };


//This is to test
  postNewPO(){
    // this.updateProjectState() 
    this.props.savePO();

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
        <div>
          <input id="address" type="text" name="address" placeholder="Address" style={{width:"400px"}}></input><br/>
          <input id="email" type="text" name="email" placeholder="E-mail" style={{width:"400px"}}></input>
          <input id="phone" type="text" name="phone" placeholder="Phone" style={{width:"400px"}}></input>
        </div>
        
        <button onClick={this.updateProjectState.bind(this)}>Update project state</button>
        <button onClick={this.showState.bind(this)}>Showproject state</button>

        <br/> 
        Ship To: <input id="shipto" type="text" name="ship" placeholder="Address" autoCorrect="off" style={{width:"400px"}}/><br/>
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
              <td><input id="subtotal" type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2">Additional Notes</td>
              <td colSpan="2" style={{textAlign:"right"}}>Tax</td>
              <td><input id="tax" type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" rowSpan="3"><textarea id="notes" cols="90" rows="3"></textarea></td>
              <td colSpan="2" style={{textAlign:"right"}}>Shipping</td>
              <td><input id="shipcost" type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{textAlign:"right"}}>Discount</td>
              <td><input id="discount" type="text" style={{width:"100%"}} autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{textAlign:"right"}}>Total</td>
              <td><input id="total" type="text" style={{width:"100%"}} autoCorrect="off"/></td>
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
