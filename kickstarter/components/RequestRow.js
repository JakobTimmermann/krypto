import React, { Component } from "react";
import { Button, Form, Input, Message, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component {
    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        console.log(campaign);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
            .approveRequest(this.props.id)
            .send({ from: accounts[0] });
        //    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };
    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        console.log(campaign);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
            .finalizeRequest(this.props.id)
            .send({ from: accounts[0] });
    };

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversValueCount } = this.props;
        const readyToFinalize =
            request.approvalValueCount > approversValueCount / 2;
        return (
            <Row
                disabled={request.complete}
                positive={readyToFinalize && !request.complete}
            >
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>
                    {web3.utils.fromWei(request.approvalValueCount, "ether")}/
                    {web3.utils.fromWei(approversValueCount, "ether")}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="green" basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button
                            disabled={!readyToFinalize}
                            color="teal"
                            basic
                            onClick={this.onFinalize}
                        >
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;
