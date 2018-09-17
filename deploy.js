const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const {mnemonic, API} = require('./provider');

const provider = new HDWalletProvider(mnemonic, API);

const web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hello ETH']})
        .send({gas: '1000000', from: accounts[0]});

    console.log('Deployed successfully to this address:', result.options.address);

};

deploy();