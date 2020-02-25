# 0. Description:
  * Create a person with name and phone number as parameters;
  * List all people;
  * Edit-delete person;
  * Send sms (only to my personal number 37253714188 due to limitation of twilio trial period);

# 1. Prerequisites for running locally:
  * mysql docker image (instead of installing mysql on OS)
  * node js installed (v. 10.16.0)
  * npm installed (v. 6.9.0)

  * Tested on MacOS Mojave 10.14.6
      
# 2. Run the application:
```sh
$ npm install
```
```sh
$ npm start
```
# 3. Request examples:
* GET /customers - return list of customers;
* POST /customers/add?name=${name}&phone=${phone_number} - add a customer;
* PUT /customers/edit/${id}?name=${name}&phone=${phone_number} - edit a customer;
* DELETE /customers/edit/${id} - delete a customer;

# 3. Possible improvements:
* Proper coverage with unit tests (due to small functionality current unit tests are just visualization)
* Integration and UI tests;
* Remove sequilize-typed queries (possible exponential growth of complexity in case of further development);
* Usage of some modern front-end framework (React, Vue, etc.);
* Search customer functionality;
