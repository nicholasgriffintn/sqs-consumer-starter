const express = require('express');
const path = require('path');
const debug = require('debug')('sqs-consumer');

const sqs = require('./sqs');
const initConsumer = require('./consumer');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.listen(port, () => {
  // Edit these options if you need to
  const options = {
    queueUrl: 'some-url',
    sqs,
    handleMessage: async (msg) => {
      debug('Handled a message...');
      debug(msg);
    },
  };
  const consumer = initConsumer(options);

  // Add your use case below, the rest of the setup has already been sorted out for you above.
  consumer.start();
});
