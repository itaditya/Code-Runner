const path = require('path');
const _ = require('lodash');

const services = require('./services');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client', 'index.html'));
  });

  app.post('/submit', (req, res) => {
    const data = _.pick(req.body, ['language', 'input', 'sourceCode']);
    services.submitCode(data, body => {
      res.send(body);
    });
  });
};
