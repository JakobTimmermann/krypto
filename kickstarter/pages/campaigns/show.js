import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm.js";
import { Link } from "../../routes";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversValueCount: summary[3],
            manager: summary[4],
            address: props.query.address,
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversValueCount,
        } = this.props;
        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" },
            },
            {
                header: web3.utils.fromWei(minimumContribution, "ether"),
                meta: "Minimum Contribution (ether)",
                description:
                    "You must contribute at least this much wei to become an approver",
                style: { overflowWrap: "break-word" },
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract and has to be approved by contributors",
            },
            {
                header: web3.utils.fromWei(approversValueCount, "ether"),
                meta: "Number of Shares (ether)",
                description: "Number of shares sold so far",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description:
                    "The balance is how much money this campaign has left",
            },
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Column>
                        <Link
                            route={`/campaigns/${this.props.address}/requests`}
                        >
                            <a>
                                <Button primary> View Requests </Button>
                            </a>
                        </Link>
                        <Grid.Row></Grid.Row>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
