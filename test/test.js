/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { Customers } = require('../controllers/customers');

chai.use(chaiAsPromised);
const { expect } = chai;

let res;
let req;

describe('Customer methods', () => {
  beforeEach(() => {
    res = {
      render: (string) => string,
    };

    req = {
      logger: {
        info: (string) => string,
        error: (string) => string,
      },
      database: {
        Person: {
          findAll: () => {},
        },
        Phone: {},
      },
    };
  });

  it('Edit customer, happy path', async () => {
    req.params = {
      id: 1,
    };
    const result = await Customers.edit(req, res);
    expect(result).to.equal('edit_customer');
  });
  it('Edit customer, no customer provided', () => expect(Customers.edit(req, res)).to.eventually.be.rejectedWith('No customer provided'));
});
