const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile.js');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hello ETH World']})
        .send({from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);

});

describe('Inbox', () => {
    it('should deploy a contract ', () => {
        assert.ok(inbox.options.address);
    });
});