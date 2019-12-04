const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const apis = express();

apis.use(bodyParser.urlencoded({ extended: false }));
apis.use(bodyParser.json());
apis.use(cors());

apis.use(express.static('build'));
apis.get('/*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));

require('./api').init(apis);

apis.listen(
    require('./config/config').portApi,
    () => console.log(`Listening api on port ${require('./config/config').portApi}`)
);
