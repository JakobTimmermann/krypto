import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x0c7633dB7414DB003Ea6E23F687bE2170D80bb9B"
);

export default instance;
