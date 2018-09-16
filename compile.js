const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inbocPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inbocPath, 'utf8');

solc.compile(source, 1);