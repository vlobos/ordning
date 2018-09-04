const router = require('express').Router();
const ctrl = require('../../db/controllers/controllers')

router.route('/login/:username')
    .get(ctrl.login.get)

router.route('/signup')
    .get(ctrl.signup.get)
    .post(ctrl.signup.post)

router.route('/vendors')
    .get(ctrl.vendors.get)
    .post(ctrl.vendors.post)

router.route('/projects')
    .get(ctrl.projects.get)
    .post(ctrl.projects.post)

router.route('/dashboard/:userId')
    .get(ctrl.orders.get)
    .post(ctrl.orders.post)

router.route('/purch')
    .get(ctrl.orderId.get)

router.route('/lineitems')
    .get(ctrl.items.get)
    .post(ctrl.items.post)

router.route('/po/:poId')
  .get(ctrl.orderDets.get)

module.exports.router = router


