const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile.js');

const provider = ganache.provider();
const web3 = new Web3(provider);

const INITIAL_STRING = 'Hello ETH World';
let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode, arguments: [INITIAL_STRING]
        })
        .send({
            from: accounts[0], gas: '1000000'
        });

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('should deploy a contract ', () => {
        assert.ok(inbox.options.address);
    });

    it('should have a default message ', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('should set a new message ', async () => {
        await inbox.methods.setMessage('new message').send({
            from: accounts[0]
        });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'new message');
    });
});