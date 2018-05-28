import React, { Component } from 'react';
import { Image, Carousel, Button, FormGroup, FormControl, Form } from 'react-bootstrap';


class HouseDisplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDniGlobal: this.props.userDniGlobal,
            houseId: this.props.houseId,
            responseHouse: [{}],
            housePhotos: [],
            bidPannel: "",
            bidding: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userDniGlobal: nextProps.userDniGlobal,
            houseId: nextProps.houseId
        });
    }

    componentWillMount() {

        let request = async () => {
            let response = await fetch('houses/' + this.state.houseId);
            let json = await response.json();

            let photosCarousel = json.photos.map((item, i) =>
                <Carousel.Item key={i}>
                    <Image key={i.i} className="imgCarousel" width={600} height={500} responsive alt="600x500" src={item} />
                </Carousel.Item>
            )

            this.setState({
                responseHouse: json,
                housePhotos: photosCarousel
            });
        }

        request();
    }

    makeBid = () => {
        this.setState({ bidding: !this.state.bidding })
    }



    handleNewBid = (e) => {
        e.preventDefault();
        const form = e.target;

        let request = async () => {
            let response = await fetch('bid/new', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({

                    dni: this.state.userDniGlobal,
                    money: form.money.value,
                    house: this.state.houseId

                }),
            });
            let json = await response.json();

            if (200 === response.status) {
                console.log(response.status);
                this.setState({
                    bidPannel: response.status
                });
            }


            console.log(response.status);
            console.log(response.data);
        }

        request();
    }



    render() {
        return (
            <div className="container-fluid">
                <Button onClick={this.props.callBack} >
                    GO BACK
            </Button>
                {0 < this.state.housePhotos.length &&
                <Carousel>
                    {this.state.housePhotos}
                </Carousel>
                }
                <h1>PRECIO DE VENTA {this.state.responseHouse.sellingPrize}</h1>
                <h1>DIRECCION {this.state.responseHouse.adress}</h1>
                <h1>PAIS {this.state.responseHouse.country}</h1>
                <h1>CIUDAD {this.state.responseHouse.city}</h1>


            {this.props.showBidForm && <Button onClick={() => this.makeBid()} >
                    MAKE YOUR BID
            </Button> }
                {this.state.bidding &&
                    <Form inline onSubmit={this.handleNewBid}>
                        <FormGroup controlId="formInlineBid">
                            <FormControl type="text" key="money" name="money" placeholder="Your Bid €€" />
                        </FormGroup>{' '}
                        <Button type="submit">Send It</Button>
                    </Form>}
            </div>

        )
    }
}

export default HouseDisplayer;