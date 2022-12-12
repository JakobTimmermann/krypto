const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const fs = require("fs");

if (process.argv.length === 2) {
    console.error("Expected password file as argument!");
    process.exit(1);
}

const password_file = process.argv.splice(2)[0];
const password = fs.readFileSync(password_file).toString().slice(0, -1);

const provider = new HDWalletProvider(
    password,
    "https://goerli.infura.io/v3/30f2c950b7b946b482d5f6cefa219aab"
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ gas: "1400000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
};
deploy();
