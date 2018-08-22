const mod = require('../models/models')

const login = {
    get: function(req, res){
        let username = req.query.username;
        let password = req.query.pass;
        mod.userLogin.get(username, password, function(err, results){
            if (err){ 
                throw err;
            } else {
                res.send(results)
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
        let username = req.query.username;
        let password = req.query.pass;
        mod.userSignup.post(username, password, function(err, results){
            if (err){
                throw err;
            } else {
                res.send('Success!')
            }
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
        let userId = req.query.userId;
        let vendor = req.query.vendor;
        let address = req.query.address;
        let phone = req.query.phone;
        let email = req.query.email;
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
        let project = req.query.project;
        let userId = req.query.userId;
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
        let userId = req.query.userId;
        mod.orders.get(userId, function(err, results){
            if (err){
                throw err;
            } else {
                res.send(results)
            }
        })
    },
    post: function(req, res){
        let poNum = req.query.poNum;
        let userId = req.query.userId;
        let date = req.query.date;
        let total = req.query.total;
        let sub = req.query.sub;
        let tax = req.query.tax;
        let shipCost = req.query.shipCost;
        let discount = req.query.discount;
        let notes = req.query.notes;
        let shipTo = req.query.shipTo;
        let vendorId = req.query.vendorId;
        let projectId = req.query.projectId;
        mod.orders.post(poNum, userId, date, total, sub, tax, shipCost, discount, notes, shipTo, vendorId, projectId, function(err, results){
            if (err){
                throw err;
            } else {
                res.send('Success!')
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
        let poId = req.query.poId;
        let item = req.query.item;
        let details = req.query.details;
        let qty = req.query.qty;
        let price = req.query.price;
        let amount = req.query.amount;
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
    login, signup, vendors, projects, orders, items
}
