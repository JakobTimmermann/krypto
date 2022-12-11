const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

fs.ensureDirSync(buildPath);
//const output = solc.compile(source, 1).contracts;
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    output.errors.forEach((err) => {
        console.log(err.formattedMessage);
    });
} else {
    const contracts = output.contracts["Campaign.sol"];
    for (let contract in contracts) {
        console.log("Compiling " + contract + " to folder " + buildPath);
        fs.outputJsonSync(
            path.resolve(buildPath, contract.replace(":", "") + ".json"),
            contracts[contract]
        );
    }
}
