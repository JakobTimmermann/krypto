// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CampaignFactory {
    address payable[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address payable[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalValueCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(address => uint) public approversContribution;
    uint public approversValueCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        if(approvers[msg.sender] == false) {
            approvers[msg.sender] = true;
            approversContribution[msg.sender] = msg.value;
            approversValueCount += msg.value;
            }
        else {
            approversContribution[msg.sender] += msg.value;
            approversValueCount += msg.value;
            }
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = requests.push(); 
        newRequest.description = description;
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalValueCount= 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalValueCount += approversContribution[msg.sender]; 
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalValueCount > (approversValueCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversValueCount,
          manager
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
