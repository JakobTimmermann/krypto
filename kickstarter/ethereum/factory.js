import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x30ecB749d3574913893bDee6B78CccE90C58360B"
);

export default instance;
