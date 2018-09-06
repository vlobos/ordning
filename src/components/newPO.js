import React from 'react';
import axios from 'axios';

class NewPO extends React.Component{
  constructor(props){
    super(props);
    this.state = {
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
      this.setState({
        vendorList: vendorList
      })
    });
  };

  autocomplete(inp, add, em, ph, arr) {
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
            b.innerHTML += "<input id='addressId' className='vendorProject' type='hidden' value='" + arr[i][2] + "'>";
            b.innerHTML += "<input id='phoneId'  className='vendorProject' type='hidden' value='" + arr[i][3] + "'>";
            b.innerHTML += "<input id='emailId'  className='vendorProject' type='hidden' value='" + arr[i][4] + "'>";
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

  postPurchDetails(id, vendorName, vendorId, vendorAdd, phone, email, projectName, projectId, poNum, date, total, sub, tax, shipCost, discount, notes, shipTo) {

    if(!vendorId && !projectId) {
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
            this.postLineItems();
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
    } else if(!vendorId) {
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
          this.postLineItems();
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err)
      })
    } else if(!projectId) {
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
          this.postLineItems();
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
    } else if(vendorId && projectId){
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
        this.postLineItems();
      })
      .catch((err) => {
        console.log(err);
      })
    }
  };

  postLineItems(){
    //get PurchaseOrder Id
    axios.get("/api/purch")
      .then((response) => {
        let po_id = response.data[0].po_id;
        //get all Line Item rows
        let tbl = document.getElementById('litable');
        //get all row data and post to db
        for (let i = 1; i <11; i++){
          let val = tbl.rows[i].cells[0].children[0].value;
          if (!val){
            this.props.updateCount(this.props.poNum, this.props.userId);
            break;
          } else {
            this.setState({
              poId: po_id,
              item: tbl.rows[i].cells[0].children[0].value,
              details: tbl.rows[i].cells[1].children[0].value,
              qty: tbl.rows[i].cells[2].children[0].value,
              price: tbl.rows[i].cells[3].children[0].value,
              amount: tbl.rows[i].cells[4].children[0].value
            }, function() {
              axios.post("api/lineitems", { params: {
                poId: this.state.poId,
                item: this.state.item,
                details: this.state.details,
                qty: this.state.qty,
                price: this.state.price,
                amount: this.state.amount
              } })
              .then((response) => {
                //update count and return to Dashboard
                console.log(response);
                this.props.updateCount(this.props.poNum, this.props.userId);
              })
              .catch((err) => {
                console.log(err);
              })
            })

          }

        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  postNewPO(){
    let id = this.props.userId;
    let date = this.props.date;
    let poNum = this.props.poNum;
    //for Project
    let projectName = document.getElementById('projInput').value;
    let projectId = document.getElementById('projInput').className || null
    //for Vendor
    let vendorName = document.getElementById('vendorInput').value;
    let vendorId = document.getElementById('vendorInput').className || null
    let vendorAdd = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    //for postPurchDetails
    let total = document.getElementById('total').value;
    let sub = document.getElementById('subtotal').value;
    let tax = document.getElementById('tax').value;
    let shipCost = document.getElementById('shipcost').value;
    let discount = document.getElementById('discount').value;
    let notes = document.getElementById('notes').value;
    let shipTo = document.getElementById('shipto').value;

    this.setState({
      projectName: projectName,
      projectId: projectId,
      vendorName: vendorName,
      vendorId: vendorId,
      vendorAdd: vendorAdd,
      phone: phone,
      email: email
    }, function() {
    this.postPurchDetails(id, vendorName, vendorId, vendorAdd, phone, email, projectName, projectId, poNum, date, total, sub, tax, shipCost, discount, notes, shipTo)
    })
  };

  render(){
    return(
      <div className="po"> 

        <div className="baselayer">

          <div className="layer tl"> Purchase Order: {this.props.poNum}</div>

          <div className="layer tr">Date: {this.props.date}</div><br/>

          <div className="layer bl">
            Vendor:  <form autoComplete="off">
              <div className="autocomplete">
                <input id="vendorInput" className="vendorProject"  type="text" name="vendor" placeholder="Vendor" onChange={this.autocompleteVendors}></input>
              </div>
            </form>
            <div>
              <input id="address" className="vendorProject" type="text" name="address" placeholder="Address" ></input><br/>
              <input id="email" className="vendorProject" type="text" name="email" placeholder="E-mail" ></input>
              <input id="phone" className="vendorProject" type="text" name="phone" placeholder="Phone" ></input>
            </div>
          </div>

          <div className="layer br">
            Ship To: <br/>
            <input id="shipto" className="vendorProject" type="text" name="ship" placeholder="Address" autoCorrect="off"/>
            <br/>
            Project: <form autoComplete="off">
                <div className="autocomplete">
                  <input id="projInput" className="vendorProject" type="text" name="Project" placeholder="Project" onChange={this.autocompleteProjects}></input>
                </div>
              </form>
          </div>
        </div>
      
        <table id="litable"  cellSpacing="1" cellPadding="1">
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
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td className="item"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="desc"><input className="tdata" type="text" autoCorrect="off"/></td>
              <td className="qty"><input className="tdata tdqty" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
              <td className="amount"><input className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="4" className="tdtitle" >Subtotal</td>
              <td className="amount"><input id="subtotal" className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" className="tdtitlenotes">Additional Notes</td>
              <td colSpan="2" className="tdtitle">Tax</td>
              <td className="amount"><input id="tax" className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" rowSpan="3"><textarea id="notes" cols="90" rows="3"></textarea></td>
              <td colSpan="2" className="tdtitle">Shipping</td>
              <td><input id="shipcost" className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" className="tdtitle">Discount</td>
              <td className="amount"><input id="discount" className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
            <tr>
              <td colSpan="2" className="tdtitle">Total</td>
              <td className="amount"><input id="total" className="tdata tdamount" type="text" autoCorrect="off"/></td>
            </tr>
          </tbody>
        </table>
        <button className="newPO" onClick={this.props.goBack}>Cancel</button>
        <button className="newPO" onClick={this.postNewPO}>Save</button>
      </div>
    )
  }
}

export default NewPO;

//save will be a post. PO needs to be updated
