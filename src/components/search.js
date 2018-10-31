import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor (props){
    super(props);
    this.state={
      vendorList: '',
      search: 'off',
      foundPOs: ''
    }
    this.autocompleteVendors=this.autocompleteVendors.bind(this)
    this.searchPO=this.searchPO.bind(this)
  }

  componentDidMount(){
    this.getList(this.props.userId);
  };

//get vendors to populate the dropdown/fill in input field
//reformat to make more modular! getList() is also used in newPO.js
  getList(id){
    let vendorList = [];
    axios.get("/api/vendors", { params: {userId: id} })
    .then((ven) => {
      let vendors= ven.data;
      vendors.forEach((vendor)=>{
        vendorList.push([vendor.vendor])
      })
      this.setState({
        vendorList: vendorList
      })
    });
  };

//autocomplete for vendor search input
//reformat to make more modular! autocomplete also used in newPO.js
//vendorList has a different structure
autocomplete(inp, arr) {
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
        if (arr[i][0].substring(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i][0].substring(0, val.length) + "</strong>";
          b.innerHTML += arr[i][0].substring(val.length);
          b.innerHTML += "<input className='hiddenId' type='hidden' id='"+ arr[i][0]+ "' value='" + arr[i][0] + "'>";
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

autocompleteVendors(e){
  let inp = document.getElementById(e.target.id);
  this.autocomplete(inp, this.state.vendorList)
};

search(poNumSearch,vendorSearch,startDate,endDate){
  console.log("Search: ", poNumSearch,vendorSearch,startDate,endDate)
  axios.get("/api/searchPo", { params: {
    poNumSearch: poNumSearch,
    vendorSearch: vendorSearch,
    startDate: startDate,
    endDate: endDate
  } }).then((posReturned)=>{
    console.log(posReturned)
    this.setState({
      foundPOs: posReturned
    })
  })
  .catch((err)=>{
    if (err){
      console.log(err)
    }
  })
};

searchPO(){
//get input values
//make axios call
let poNumSearch = document.getElementById("poSearch").value;
let vendorSearch = document.getElementById("vendorSearch").value;
let startDate = document.getElementById("startDate").value;
let endDate = document.getElementById("endDate").value;
this.setState({
  search: "on"
}, function(){
  if(!startDate || !endDate){
    console.log("INSERT DATES")
  }else{
    this.search(poNumSearch,vendorSearch,startDate,endDate);
  }
})

}

  render (){
    return (
      <div>
        Search By
        <div>
        <form autoComplete="off">
          PO Number: <input autoComplete="off" id="poSearch"></input>
          Vendor:  
                <input className="autocomplete" id="vendorSearch"  type="text" name="vendor" onChange={this.autocompleteVendors}></input>
          Start: <input id="startDate" autoComplete="off" placeholder="mm/dd/yyyy"></input>
          End: <input id="endDate" autoComplete="off" placeholder="mm/dd/yyyy"></input>
          </form>
          <button className="createNew" onClick={this.searchPO}>Search</button>
        </div>
      </div>
    )
  }
}

export default Search;