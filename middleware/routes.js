const { Customers } = require('../controllers/customers');
const { Sms } = require('../controllers/sms');
const { Main } = require('../controllers/index');

class Routes {
  static registerRoutes(router) {
    router.get('/', Main.index);
    router.get('/customers', Customers.list);
    router.get('/customers/add', Customers.add);
    router.post('/customers/add', Customers.save);
    router.delete('/customers/delete/:id', Customers.deleteCustomer);
    router.get('/customers/edit/:id', Customers.edit);
    router.put('/customers/edit/:id', Customers.saveEdit);
    router.get('/customers/sms/:id', Sms.smsPage);
    router.post('/customers/sms/:id', Sms.sendSms);
  }
}

module.exports = { Routes };
