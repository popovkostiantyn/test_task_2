class Customers {
  static async list(req, res) {
    req.logger.info('Fetching list of all customers');
    let rows = [];
    try {
      rows = await req.database.Person.findAll({
        attributes: ['name', 'id'],
        include: {
          attributes: ['number'],
          model: req.database.Phone,
          required: true,
        },
      });
      req.logger.info('Fetched customers', rows);
    } catch (e) {
      req.logger.error(`Could not fetch the data from database. Error: ${e}`);
    }
    return res.render('customers', { page_title: 'Customers', data: rows });
  }

  static add(req, res) {
    req.logger.info('Fetching add_customers page');
    return res.render('add_customer', { page_title: 'Add Customers' });
  }

  static async edit(req, res) {
    if (!req || !req.params || !req.params.id) {
      throw new Error('No customer provided');
    }
    req.logger.info('Editing customer id:', req.params.id);
    let rows = [];
    try {
      const customerId = req.params.id;
      rows = await req.database.Person.findAll({
        attributes: ['name', 'id'],
        where: {
          id: customerId,
        },
        include: {
          attributes: ['number'],
          model: req.database.Phone,
          required: true,
        },
      });
      req.logger.info('Edited customer', rows);
    } catch (e) {
      req.logger.error(`Could not find the element. Error: ${e}`);
    }
    return res.render('edit_customer', { page_title: 'Edit Customers', data: rows });
  }

  static async save(req, res) {
    const input = JSON.parse(JSON.stringify(req.body));
    let phone = '';
    let name = '';
    if (JSON.stringify(input) === '{}') {
      // request comes not from UI (postman, another application, etc.)
      phone = req.query.phone;
      name = req.query.name;
    } else {
      // request comes from UI
      phone = input.phone;
      name = input.name;
    }
    req.logger.info('Saving new customer', req.params.id);
    try {
      const user = await req.database.Phone.create({
        number: phone,
      });
      const person = await req.database.Person.create({
        name,
      });
      await user.setPerson(person);
      req.logger.info('New customer saved', user, person);
    } catch (e) {
      req.logger.error(`Data was not saved. Error: ${e}`);
    }
    return res.redirect('/customers');
  }

  static async saveEdit(req, res) {
    const input = JSON.parse(JSON.stringify(req.body));
    const customerId = req.params.id;
    let phone = '';
    let name = '';
    if (JSON.stringify(input) === '{}') {
    // request comes not from UI (postman, another application, etc.)
      phone = req.query.phone;
      name = req.query.name;
    } else {
    // request comes from UI
      phone = input.phone;
      name = input.name;
    }
    req.logger.info('Editing customer', customerId);
    try {
      await req.database.Phone.update(
        {
          number: phone,
        },
        {
          where: {
            id: customerId,
          },
        },
      );
      await req.database.Person.update(
        {
          name,
        },
        {
          where: {
            id: customerId,
          },
        },
      );
      req.logger.info('Edited customer', customerId);
    } catch (e) {
      req.logger.error(`Data was not updated. Error: ${e}`);
    }
    return res.redirect('/customers');
  }

  static async deleteCustomer(req, res) {
    const customerId = req.params.id;
    req.logger.info('Deleting customer', customerId);
    try {
      await req.database.Phone.destroy({
        where: {
          id: customerId,
        },
      });
      await req.database.Person.destroy({
        where: {
          id: customerId,
        },
      });
      req.logger.info('Customer deleted', customerId);
    } catch (e) {
      req.logger.error(`Customer was not deleted. Error: ${e}`);
    }
    return res.redirect('/customers');
  }
}

module.exports = { Customers };
