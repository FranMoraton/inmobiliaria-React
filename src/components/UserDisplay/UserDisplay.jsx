import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
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

            let userBirthDate = json[0].birthDate.date;
            let userRegisterDate = json[0].registerDate.date;



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
                <h1>USER{this.state.userInfo.dni}</h1>
                <h1>BIRTHDATE{this.state.userBirthDate}</h1>
                <h1>REGISTER DATE{this.state.userRegisterDate}</h1>
                <h3>{this.state.userInfo.photo}</h3>
                <Button onClick={this.UpdateUserVisibility}>UPDATE</Button>
               {this.state.updateVisible && <FormBuilder url={this.state.url} />}
            </div>
        )
    }
}

export default UserDisplay;