import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

const URLS = {
    ACCEPT: '/bid/acceptbid',
    REJECT: '/bid/rejectbid',
    LIST: '/bid/house/bids'
}

class BidTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDniGlobal: this.props.userDniGlobal,
            houseId: this.props.houseId,
            responseBids: [],
            tableRows: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            userDniGlobal: nextProps.userDniGlobal,
            houseId: nextProps.houseId
        });
    }

    componentWillMount() {

        this.callTable();
    }

    callTable = async () => {
    let response = await fetch(URLS.LIST, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            houseId: this.props.houseId
        }),
    });
    let json = await response.json();
    console.log(json);
    let bids = json.map((item, i) =>
        <tr key={i}>
            <td>{item.id}</td>
            <td>{item.moneyBidded}</td>
            <td>{item.userBidding}</td>
            {item.accepted ? <td>TRUE</td> : <td>FALSE</td>}
            {item.rejected ? <td>TRUE</td> : <td>FALSE</td>}
            <td><Button bsStyle="success" onClick={() => this.aceptBid(item.id)}> ACEPT</Button></td>
            <td><Button bsStyle="danger" onClick={() => this.rejectBid(item.id)}> REJECT </Button></td>
        </tr>
    )

    this.setState({
        tableRows: bids,
    });
}

    aceptBid = (bidId) => {

        let aceptCall = async () => {
            let response = await fetch(URLS.ACCEPT, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    houseId: this.state.houseId,
                    dni: this.state.userDniGlobal,
                    bidId: bidId
                }),
            });
            let json = await response.json();
            
        }

        aceptCall();
        this.callTable();

    }

    rejectBid = (bidId) => {

        let rejectCall = async () => {
            let response = await fetch(URLS.REJECT, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    houseId: this.state.houseId,
                    dni: this.state.userDniGlobal,
                    bidId: bidId
                }),
            });
            let json = await response.json();

        }

        rejectCall();
        this.callTable();
    }






    render() {
        return (
            <div className="container-fluid">

                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Money Bidded</th>
                            <th>user Bidding</th>
                            <th>accepted</th>
                            <th>rejected</th>
                            <th>ACEPT</th>
                            <th>REJECT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableRows}
                    </tbody>
                </Table>


                <Button onClick={this.props.callBack} >
                    GO BACK
                </Button>
            </div>
        )
    }
}

export default BidTable;