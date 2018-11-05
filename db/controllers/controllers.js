const mod = require('../models/models');
const bcrypt = require('bcrypt');
const salt = 10;

const login = {
    get: function(req, res){
        let username = req.params.username;
        let password = req.query.pass;
        mod.userLogin.get(username, function(err, results){
            if (err){ 
              throw err;
            } else {
              if (results.length === 0) {
                res.send(results)
              } else {
                let hash = results[0].pass
                bcrypt.compare(password, hash, function(err, dbPass) {
                  if (err) {
                    throw err;
                  } else {
                    if(dbPass === false) {
                      res.status(200).send("Invalid Password");
                      } else {
                        res.status(200).send(results)
                      }
                    }
                })
              }
            }
        })
    }
}

const signup = {
    get: function(req, res){
        let username = req.query.username;
        mod.userSignup.get(username, function(err, results){
            if (err){
                throw err;
            } else {
              res.send(results)
            }
        })
    },
    post: function(req, res){
        let username = req.body.params.username;
        let password = req.body.params.pass;
        bcrypt.hash(password, salt, function(err, hash) {
          mod.userSignup.post(username, hash, function(err, results){
              if (err){
                  throw err;
              } else {
                  res.send('Success!')
              }
          })
        })
    }
}

const vendors = {
    get: function(req, res){
        let userId = req.query.userId;
        mod.vendors.get(userId, function(err,results){
            if(err) {
                throw err;
            } else {
                res.send(results)
            }
        })
    },
    post: function(req, res){
        let userId = req.body.params.userId;
        let vendor = req.body.params.vendor;
        let address = req.body.params.address;
        let phone = req.body.params.phone;
        let email = req.body.params.email;
        mod.vendors.post(userId, vendor, address, phone, email, function(err,results){
            if(err) {
                throw err;
            } else {
                res.send('Success!')
            }
        })
    }
}

const projects = {
    get: function(req, res){
        let userId = req.query.userId;
        mod.projects.get(userId, function(err, results){
            if (err){
                throw err;
            } else {
                res.send(results)
            }
        })
    },
    post: function(req, res){
        let project = req.body.params.project;
        let userId = req.body.params.userId;
        mod.projects.post(project, userId, function(err, results){
            if(err){
                throw err;
            } else {
                res.send('Success!')
            }
        })
    }
}

const orders = {
    get: function(req, res){
        let userId = req.params.userId;
        mod.orders.get(userId, function(err, results){
            if (err){
                throw err;
            } else {
                res.send(results)
            }
        })
    },
    post: function(req, res){
        let poNum = req.body.params.poNum;
        let userId = req.body.params.userId;
        let date = req.body.params.date;
        let total = req.body.params.total;
        let sub = req.body.params.sub;
        let tax = req.body.params.tax;
        let shipCost = req.body.params.shipCost;
        let discount = req.body.params.discount;
        let notes = req.body.params.notes;
        let shipTo = req.body.params.shipTo;
        let vendorId = req.body.params.vendorId;
        let projectId = req.body.params.projectId;
        mod.orders.post(poNum, userId, date, total, sub, tax, shipCost, discount, notes, shipTo, vendorId, projectId, function(err, results){
            if (err){
              throw err;
            } else {
              res.send('Success!')
            }
        })
    }
}

const orderDets = {
  get: function(req, res){
    let poId = req.params.poId;
    mod.orderDets.get(poId, function(err, results){
      if (err){
        throw err;
      } else {
        res.send(results)
      }
    })
  }
}

const orderId = {
  get: function(req, res) {
    mod.orderId.get(function(err, results) {
      if(err) {
        throw err;
      } else {
        res.send(results)
      }
    })
  }
}

const items = {
  get: function(req, res){
      let poId = req.query.poId;
      mod.lineItems.get(poId, function(err, results){
          if (err){
              throw err;
          } else {
              res.send(results)
          }
      })
  },
  post: function(req, res){
      let poId = req.body.params.poId;
      let item = req.body.params.item;
      let details = req.body.params.details;
      let qty = req.body.params.qty;
      let price = req.body.params.price;
      let amount = req.body.params.amount;
      mod.lineItems.post(poId, item, details, qty, price, amount, function(err, results){
          if (err){
              throw err;
          } else {
              res.send('Success!')
          }
      })
  }
}

module.exports = {
    login, signup, vendors, projects, orders, items, orderDets, orderId
}
