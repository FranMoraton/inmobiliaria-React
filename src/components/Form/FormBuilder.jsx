import React, { Component } from 'react';
import { Fade, Well, FormGroup, FormControl, Button } from 'react-bootstrap';

const URLS = {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    ADD_HOUSE: '/houses/create',
    UPDATE_USER: '/user/update'
}

const ADD_HOUSE = {
    "inputs":
        [
            { tx: "text", key: "adress", phrase: "Address" },
            { tx: "text", key: "sellingPrize", phrase: "sellingPrize" },
            { tx: "text", key: "city", phrase: "city" },
            { tx: "text", key: "country", phrase: "country" }
        ]
}

const REGISTER_USER = {
    "inputs":
        [
            { tx: "text", key: "dni", phrase: "DNI" },
            { tx: "date", key: "birthDate", phrase: "Fecha de nacimiento" },
            { tx: "password", key: "password", phrase: "Contraseña" }
        ]
}

const LOGIN_USER = {
    "inputs":
        [
            { tx: "text", key: "dni", phrase: "DNI" },
            { tx: "password", key: "password", phrase: "Contraseña" }
        ]
}

const UPDATE_USER = {
    "inputs":
        [
            { tx: "text", key: "dni", phrase: "DNI" },
            { tx: "date", key: "birthDate", phrase: "Fecha de nacimiento" },
            { tx: "password", key: "password", phrase: "Contraseña" },
            { tx: "passwordVerify", key: "passwordVerify", phrase: "Verificar Contraseña" }
        ]
}

class FormBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            userDniGlobal: this.props.userDniGlobal,
            send: true,
            done: false,
            formControls: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            url: nextProps.url,
            userDniGlobal: nextProps.userDniGlobal,
            mapHelper: nextProps.mapHelper
        });
    }

    createFormControls = (parametersInput) => {
        let arrayFormControl = parametersInput.map((param, i) =>
            <FormControl className="formFile" key={i} type={param.tx} name={param.key} placeholder={param.phrase} />);
        return arrayFormControl;
    }

    selectForm = (url) => {
        switch (url) {
            case URLS.LOGIN:
                return this.createFormControls(LOGIN_USER.inputs);
            case URLS.REGISTER:
                return this.createFormControls(REGISTER_USER.inputs);
            case URLS.ADD_HOUSE:
                return this.createFormControls(ADD_HOUSE.inputs);
            case URLS.UPDATE_USER:
                return this.createFormControls(UPDATE_USER.inputs);
            default:
                break;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        let mapHelper = Array.from(form);

        const payload = {};

        let array = mapHelper.map((child) =>
            payload[child.name] = child.value);

        let call = async () => {

            let responseFromForm = await fetch(this.props.url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(
                    payload
                ),
            });

            let json = await responseFromForm.json();

                       
            if (200 === responseFromForm.status && URLS.LOGIN === this.props.url) {
                
                this.props.logInCallBack(json[0].dni);
            }
        }

        call();
    }


    render() {
        return (
            <div className="container-fluid">
                <form className="baseForm" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        {this.selectForm(this.state.url)}
                    </FormGroup>
                    {this.state.send && <Button bsSize="large" bsStyle="success" type="submit">Enviar</Button>}
                    {this.state.done && <Button bsSize="large" bsStyle="success" onClick={this.finish}>Hecho</Button>}
                </form>
            </div>
        )
    }
}

export default FormBuilder;