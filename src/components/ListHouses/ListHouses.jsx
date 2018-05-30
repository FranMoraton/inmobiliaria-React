import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, Form, Pager, Modal} from 'react-bootstrap';
import HouseDisplayer from './../HouseDisplayer/HouseDisplayer';
import UploadPhoto from './../UploadPhoto/UploadPhoto';
import BidTable from '../BidTable/BidTable';
import './ListHouse.css';

const URLS = {
    USER_HOUSES: '/houses/houses',
    BIDS_BY_USER: '/houses/biddedhouses',
    INSERT_HOUSE_PHOTO: '/houses/photo/'
}

class ListHouses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDniGlobal: this.props.userDniGlobal,
            visibleAll: true,
            responseHouse: [],
            housesToLoad: [],
            houseId: '',
            visibleTable: false,
            visibleHouse: false,
            visibleUploader: true,
            uploader: ""
        }
    }

    componentWillMount() {

        let request = async () => {
            let response = await fetch(this.props.url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    dni: this.state.userDniGlobal
                }),
            });
            let json = await response.json();
          

            let houses = json.map((item, i) =>
                <Col key={i} xs={12} md={3}>
                    <Thumbnail src={item.photos[0]} alt="242x200" key={item.id} onClick={() => this.selectHouse(item.id)}>
                        <h3>{item.sellingPrize}€</h3>
                        <p>{item.country}</p>
                        <p>{item.city}</p>
                        {this.props.url === URLS.BIDS_BY_USER && <Button> STATUS BID </Button>}
                        {this.props.url === URLS.BIDS_BY_USER && <Button> STATUS BID </Button>}
                    </Thumbnail>
                    {this.props.url === URLS.USER_HOUSES && <Button onClick={() => this.uploadImage(item.id)}> SUBIR FOTO </Button>}
                    {this.props.url === URLS.USER_HOUSES && <Button onClick={() => this.showTable(item.id)}> OFERTAS </Button>}
                </Col>
            )

            this.setState({
                responseHouse: json,
                housesToLoad: houses
            });
        }

        request();
    }


    ListHouseDisplayerCallBack = () => {
        this.setState({
            visibleAll: true,
            visibleTable: false,
            visibleHouse: false,
            uploader: ''
        })
    }

    selectHouse = (number) => {
        this.setState({
            visibleAll: false,
            visibleTable:false,
            visibleHouse: true,
            houseId: number
        })
    }

    showTable = (number) => {
        this.setState({
            visibleAll: false,
            visibleTable: true,
            visibleHouse: false,
            houseId: number
        })
    }

    uploadImage = (houseId) => {
        this.setState({
            uploader:
                <div>
                    <Modal show={this.state.visibleUploader} onHide={this.ListHouseDisplayerCallBack}>
                        <Modal.Body>
                            <UploadPhoto index={houseId} url={URLS.INSERT_HOUSE_PHOTO} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.ListHouseDisplayerCallBack}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        })
            ;
    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.visibleUploader && this.state.uploader}
                {this.props.url === URLS.USER_HOUSES ? <h1 className="houses-title">CASAS</h1> : <h1 className="houses-title">PUJAS</h1>}
                {this.state.visibleAll &&
                    <Grid>
                        <Row>
                            {this.state.housesToLoad}
                        </Row>
                    </Grid>
                }
                    
                {this.state.visibleHouse &&
                    <HouseDisplayer houseId={this.state.houseId} 
                        userDniGlobal={this.state.userDniGlobal} callBack={this.ListHouseDisplayerCallBack} showBidForm={false}/>
                }

                {this.state.visibleTable &&
                    <BidTable userDniGlobal={this.props.userDniGlobal} 
                    houseId={this.state.houseId} callBack={this.ListHouseDisplayerCallBack}/>}
            </div>
        )
    }

}

export default ListHouses;