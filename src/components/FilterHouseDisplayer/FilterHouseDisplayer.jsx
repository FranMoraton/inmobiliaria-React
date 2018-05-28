import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, Form, Pager } from 'react-bootstrap';
import HouseDisplayer from './../HouseDisplayer/HouseDisplayer';



class FilterHouseDisplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDniGlobal: this.props.userDniGlobal,
            visibleAll: true,
            visibleHouse: "",
            pagination: 1,
            maxPrize: 10000000,
            minPrize: 0,
            city: '',
            country: '',
            responseHouse: [],
            housesToLoad: [],
            houseId: ''
        }
    }

    componentWillMount() {

        let call = async () => {
            let response = await fetch(this.props.url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({

                    page: this.state.pagination,
                    maxPrize: this.state.maxPrize,
                    minPrize: this.state.minPrize,
                    city: this.state.city,
                    country: this.state.country
                }),
            });
            let json = await response.json();

            let houses = json.map((item, i) =>
                <Col key={i} xs={12} md={3}>
                    <Thumbnail src={item.photos[0]} alt="242x200" key={item.id} onClick={() => this.selectHouse(item.id)}>
                        <h3>{item.sellingPrize}€</h3>
                        <p>{item.country}</p>
                        <p>{item.city}</p>
                    </Thumbnail>
                </Col>
            )

            this.setState({
                responseHouse: json,
                housesToLoad: houses
            });
        }

        call();
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            userDniGlobal: nextProps.userDniGlobal,
            url: nextProps.url
        });
    }

    filterHouses = (e) => {
        e.preventDefault();
        const form = e.target;


        if (form.maxPrize.value === '') {
            form.maxPrize.value = this.state.maxPrize
        }

        if (form.minPrize.value === '') {
            form.minPrize.value = this.state.minPrize
        }
        /*
                this.setState({
                    pagination: 1,
                    maxPrize: form.maxPrize.value,
                    minPrize: form.minPrize.value,
                    city: form.city.value,
                    country: form.city.value
                })
        */
        let request = async () => {
            let response = await fetch(this.props.url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({

                    page: this.state.pagination,
                    maxPrize: form.maxPrize.value,
                    minPrize: form.minPrize.value,
                    city: form.city.value,
                    country: form.country.value
                }),
            });
            let json = await response.json();

            let houses = json.map((item, i) =>
                <Col key={i} xs={12} md={3}>
                    <Thumbnail src={item.photos[0]} alt="242x200" key={item.id} onClick={() => this.selectHouse(item.id)}>
                        <h3>{item.sellingPrize}€</h3>
                        <p>{item.country}</p>
                        <p>{item.city}</p>
                    </Thumbnail>
                </Col>
            )

            this.setState({
                responseHouse: json,
                housesToLoad: houses
            });
        }

        request();
    }



    filterHouseDisplayerCallBack = () => {
        this.setState({
            visibleAll: true
        })
    }

    selectHouse = (number) => {
        this.setState({
            visibleAll: false,
            houseId: number
        })
    }
    paginationLess = () => {
        if (this.state.pagination > 1) {
            this.setState({
                pagination: this.state.pagination - 1
            })
        }
    }

    paginationPlus = () => {
        this.setState({
            pagination: this.state.pagination + 1
        })
    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.visibleAll ?
                    <Grid>
                        <Row>
                            <Form inline onSubmit={this.filterHouses}>
                                <FormGroup controlId="formInlineCountry">
                                    <ControlLabel>Country</ControlLabel>{' '}
                                    <FormControl type="text" key="country" name="country" placeholder="Country" />
                                </FormGroup>{' '}
                                <FormGroup controlId="formInlineCiudad">
                                    <ControlLabel>City</ControlLabel>{' '}
                                    <FormControl type="Text" key="city" name="city" placeholder="City" />
                                </FormGroup>{' '}
                                <FormGroup controlId="formInlineMinPrize">
                                    <ControlLabel>Min Prize</ControlLabel>{' '}
                                    <FormControl type="Text" key="minPrize" name="minPrize" placeholder="Min Prize" />
                                </FormGroup>{' '}
                                <FormGroup controlId="formInlineMaxPrize">
                                    <ControlLabel>Max Prize</ControlLabel>{' '}
                                    <FormControl type="Text" key="maxPrize" name="maxPrize" placeholder="Max Prize" />
                                </FormGroup>{' '}
                                <Button type="submit">SEARCH</Button>
                            </Form>
                        </Row>
                        <Row>
                            <Pager>
                                <Pager.Item onClick={() => this.paginationLess()}>Previous</Pager.Item>
                                <Pager.Item>{this.state.pagination}</Pager.Item>
                                <Pager.Item onClick={() => this.paginationPlus()}>Next</Pager.Item>
                            </Pager>
                        </Row>
                        <Row>
                            {this.state.housesToLoad}
                        </Row>
                    </Grid>

                    :
                    <HouseDisplayer houseId={this.state.houseId} 
                    userDniGlobal={this.state.userDniGlobal} callBack={this.filterHouseDisplayerCallBack} showBidForm={true}/>
                }
            </div>
        )
    }

}

export default FilterHouseDisplayer;