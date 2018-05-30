import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import FormBuilder from './../Form/FormBuilder';


class UserDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDniGlobal: this.props.userDniGlobal,
            url: this.props.url,
            userInfo: '',
            updateVisible: false,
            userBirthDate: '',
            userRegisterDate: ''

        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userDniGlobal: nextProps.userDniGlobal
        });
    }

    componentWillMount() {

        let request = async () => {
            let response = await fetch('user/user', {
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

            let userBirthDate = json[0].birthDate.date.substr(0, 10);
            console.log(userBirthDate);
            let userRegisterDate = json[0].registerDate.date.substr(0, 10);
            console.log(userRegisterDate);



            this.setState({
                userInfo: json[0],
                userBirthDate: userBirthDate,
                userRegisterDate: userRegisterDate
            });

        }

        request();
    }


    updateUser = (e) => {
        e.preventDefault();
        const form = e.target;

    }

    UpdateUserVisibility = () => {
        this.setState({
            updateVisible: !this.state.updateVisible
        })
    }


    render() {
        return (
            <div>
                <Row>
                    <Col xs={0} md={1}></Col>
                    <Col xs={12} md={5}>
                        <h1>USER</h1>
                        <h2>{this.state.userInfo.dni}</h2>
                        <h1>BIRTHDATE</h1>
                        <h2>{this.state.userBirthDate}</h2>
                        <h1>REGISTER DATE</h1>
                        <h2>{this.state.userRegisterDate}</h2>
                        <h3>{this.state.userInfo.photo}</h3>
                    </Col>

                    <Col xs={12} md={5}>
                        <Button onClick={this.UpdateUserVisibility}>UPDATE</Button>
                        {this.state.updateVisible && <FormBuilder url={this.state.url} />}
                    </Col>
                    <Col xs={0} md={1}></Col>
                </Row>
            </div>
        )
    }
}

export default UserDisplay;