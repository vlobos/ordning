const db = require('../config');

const userLogin = {
  get: function(username, callback){
      let query = 'select id, username, pass from usernames where username = ?';
      db.query(query, [username], function(err, results){
          if (err) throw err;
          callback(err,results)
      })
  }
};

const userSignup = {
  get: function(username, callback){
      let query = 'select username from usernames where username = ?';
      db.query(query, [username], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  },
  post: function(username, password, callback){
      let query = 'insert into usernames (username, pass) values (?,?)';
      db.query(query, [username, password], function(err, results){
          if (err) throw err;
          callback(err, results);
      })
  }
};

const vendors = {
  get: function(userId, callback){
      let query = 'select * from vendors where username_id = ?';
      db.query(query, [userId], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  },
  post: function(userId, vendor, address, phone, email, callback) {
      let query = 'insert into vendors (username_id, vendor, vendor_address, phone, email) values (?, ?, ?, ?, ?)';
      db.query(query, [userId, vendor, address, phone, email], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  }
};

const projects = {
  get: function(userId, callback){
      let query = 'select * from projects where username_id = ?';
      db.query(query, [userId], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  },
  post: function(project, userId, callback) {
      let query = 'insert into projects (project, username_id) values (?, ?)';
      db.query(query, [project, userId], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  }
};

const orders = {
  get: function(userId, callback){
      let query = 'select a.id, a.po_num, a.date_created, b.vendor, a.total from purchase_orders as a join vendors as b on a.vendor_id = b.id where a.username_id = ? order by a.id desc';
      db.query(query, [userId], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  },
  post: function(poNum, userId, date, total, sub, tax, shipCost, discount, notes, shipTo, vendorId, projectId, callback) {
      let query = `insert into purchase_orders (po_num, username_id, date_created, total, sub, tax, shipping_cost, discount, notes, ship_to, vendor_id, project_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (select id from vendors where vendor=? and username_id=${userId}), (select id from projects where project=? and username_id=${userId}))`;
      db.query(query,[poNum, userId, date, total, sub, tax, shipCost, discount, notes, shipTo, vendorId, projectId], function (err, results){
          if(err) throw err;
          callback(err, results)
      })
  }
};

const orderDets = {
  get: function(id, callback){
    let query = 'select a.*, c.project, b.vendor, b.vendor_address, b.phone, b.email from purchase_orders as a join vendors as b on a.vendor_id = b.id join projects as c on a.project_id = c.id where a.id = ? ';
    db.query(query, [id], function(err, results){
      if (err) throw err;
      callback(err, results)
    })
  }
};

const orderId = {
  get: function(callback) {
    let query = 'select max(id) as po_id from purchase_orders';
    db.query(query, function(err, results) {
      if(err) throw err;
      callback(err, results);
    })
  }
};

const lineItems = {
  get: function(poId, callback){
      let query = 'select item, item_details, qty, unit_price, amount from line_items where po_id = ?';
      db.query(query, [poId], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  },
  post: function(poId, item, details, qty, price, amount, callback){
      let query = 'insert into line_items (po_id, item, item_details, qty, unit_price, amount) values (?, ?, ?, ?, ?, ?)';
      db.query(query, [poId, item, details, qty, price, amount], function(err, results){
          if (err) throw err;
          callback(err, results)
      })
  }
};

const search = {
  get: function(userId, poNumSearch, vendorSearch, startDate, endDate, callback){
    let query = 'select po_num from purchase_orders where po_num=?';
      db.query(query, [poNumSearch], function(err, results){
        if(err) throw err;
        callback(err,results);
    }) 
  }
};

module.exports = {
    userLogin, userSignup, vendors, projects, orders, lineItems, orderId, orderDets, search
}