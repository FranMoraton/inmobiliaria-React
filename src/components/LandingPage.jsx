import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button } from "react-bootstrap";
import Cookies from 'js-cookie';
import FilterHouseDisplayer from './FilterHouseDisplayer/FilterHouseDisplayer';
import FormBuilder from './Form/FormBuilder';
import ListHouses from './ListHouses/ListHouses';
import UserDisplay from './UserDisplay/UserDisplay';
import './LandingPage.css';

const URLS = {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    USER_PROFILE: '/user/update',
    FILTER: '/houses/filter',
    ADD_HOUSE: '/houses/create',
    USER_HOUSES: '/houses/houses',
    BIDS_BY_USER: '/houses/biddedhouses',
    EMPTY: ''
}

class LandingPage extends Component {

    state = {
        loged: false,
        dni: "",
        selectedUrl: URLS.EMPTY
    }

    componentWillMount() {
        if ('' !== Cookies.get("user") && undefined !== Cookies.get("user")) {
            this.setState({
                dni: Cookies.get("user"),
                loged: true,
                selectedUrl: URLS.EMPTY
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dni: nextProps.dni,
            loged: nextProps.loged,
            url: nextProps.url
        });
    }

    logIn = () => {
        this.selectUrl(URLS.LOGIN);
    }

    logInCallBack = (dni) => {
        Cookies.set("user", dni);

        this.setState({
            dni: Cookies.get("user"),
            selectedUrl: URLS.EMPTY
        });

        this.checkIfLogged();
    }

    logOut = () => {
        this.selectUrl(URLS.EMPTY);
        Cookies.remove("user");
        this.setState({
            loged: false,
            dni: ""
        });
    }
    log

    selectUrl = (param) => {
        this.setState({
            selectedUrl: param
        });
    }

    checkIfLogged = () => {

        if ('' === Cookies.get("user") && undefined === Cookies.get("user")) {
            this.setState({
                loged: false
            })
        }
        this.setState({
            loged: true
        })

    }

    render() {
        return (
            <div className="container-fluid">
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a onClick={() => this.selectUrl(URLS.EMPTY)} href="#home">Inmobiliaria</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#Filter" onClick={() => this.selectUrl(URLS.FILTER)}>
                                FIND YOUR HOME
                            </NavItem>
                            {this.state.loged ?
                                <NavDropdown eventKey={3} title={this.state.dni} id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1} onClick={() => this.selectUrl(URLS.USER_PROFILE)}>Perfil</MenuItem>
                                    <MenuItem eventKey={3.1} onClick={() => this.selectUrl(URLS.BIDS_BY_USER)}>Pujas</MenuItem>
                                    <MenuItem eventKey={3.2} onClick={() => this.selectUrl(URLS.USER_HOUSES)}>Casas</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.4} onClick={() => this.selectUrl(URLS.ADD_HOUSE)}>Añadir una Casa</MenuItem>
                                </NavDropdown>
                                :
                                <NavItem eventKey={1} href="#LogIn" onClick={this.logIn}>
                                    LOG IN
                                </NavItem>
                            }
                            {this.state.loged ?
                                <NavItem eventKey={2} href="#LogOut" onClick={this.logOut}>
                                    LOG OUT
                                </NavItem>

                                :
                                <NavItem eventKey={2} href="#Register" onClick={() => this.selectUrl(URLS.REGISTER)}>
                                    REGISTER
                                </NavItem>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                {
                    URLS.LOGIN === this.state.selectedUrl
                    &&
                    <FormBuilder url={this.state.selectedUrl} logInCallBack={this.logInCallBack} />
                }
                {
                    URLS.FILTER === this.state.selectedUrl
                    && <FilterHouseDisplayer userDniGlobal={this.state.dni} url={this.state.selectedUrl} />
                }
                {
                    URLS.REGISTER === this.state.selectedUrl
                    &&
                    <FormBuilder url={this.state.selectedUrl} />
                }
                {
                    URLS.ADD_HOUSE === this.state.selectedUrl
                    &&
                    <FormBuilder userDniGlobal={this.state.dni} url={this.state.selectedUrl} />
                }
                {
                    URLS.BIDS_BY_USER === this.state.selectedUrl
                    &&
                    <ListHouses userDniGlobal={this.state.dni} url={this.state.selectedUrl} />
                }
                {
                    URLS.USER_HOUSES === this.state.selectedUrl
                    &&
                    <ListHouses userDniGlobal={this.state.dni} url={this.state.selectedUrl} />
                }
                {
                    URLS.USER_PROFILE === this.state.selectedUrl
                    &&
                    <UserDisplay userDniGlobal={this.state.dni} url={this.state.selectedUrl} />
                }
                {
                    URLS.EMPTY === this.state.selectedUrl
                    &&
                    <div className="header">
                        <div className="title">
                            <h1>TENEMOS TU CASA DE ENSUEÑO</h1>
                            <a className="button" onClick={() => this.selectUrl(URLS.FILTER)}>LLEVAME!</a>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default LandingPage;