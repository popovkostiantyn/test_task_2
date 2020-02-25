const config = require('config');
const twilio = require('twilio');

class Sms {
  static async smsPage(req, res) {
    if (!req || !req.params || !req.params.id) {
      throw new Error('No cutomer chosen');
    }
    const customerId = req.params.id;
    req.logger.info('Rendering sms page for customer', customerId);
    return res.render('sms', { page_title: 'Send sms', data: customerId });
  }

  static async sendSms(req, res) {
    if (!req || !req.body) {
      throw new Error('No params passed');
    }
    const input = JSON.parse(JSON.stringify(req.body));
    const customerId = req.params.id;
    let sms = '';
    if (JSON.stringify(input) === '{}') {
      // request comes not from UI (postman, another application, etc.)
      sms = req.query.sms;
    } else {
      // request comes from UI
      sms = input.sms;
    }
    req.logger.info('Sending sms for customer', customerId);
    try {
      const receiverPhone = await req.database.Phone.findAll({
        attributes: ['number'],
        where: {
          id: customerId,
        },
        include: {
          attributes: ['name'],
          model: req.database.Person,
        },
      });
      // eslint-disable-next-line max-len
      if (!receiverPhone || !receiverPhone[0] || !receiverPhone[0].Person || !receiverPhone[0].Person.name || receiverPhone[0].number) {
        req.logger.error('Customer not found');
        throw new Error('Customer not found');
      }
      const accountSid = config.get('twilio.accountSid');
      const authToken = config.get('twilio.authToken');
      const client = twilio(accountSid, authToken);
      const message = await client.messages.create({
        body: `Hello, ${receiverPhone[0].Person.name}, your message: ${sms}`,
        to: `+${receiverPhone[0].number}`,
        from: `${config.get('twilio.phone.from')}`,
      });
      await process.stdout.write(message.sid);
      req.logger.info('Sent sms to customer', customerId);
    } catch (e) {
      req.logger.error(`SMS was not sent. Error: ${e}`);
    }
    return res.redirect('/customers');
  }
}

module.exports = { Sms };
