import React, { Component } from 'react';
import { ButtonToolbar, Panel, Image, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';


class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            visibleImage: false,
            visibleImageUploader: true,
            visibleDone: false,
            visibleOutput: false,
            visibleSend: false,
            picture: "",
            file: ""

        }
        this.index;
        this.onDrop = this.onDrop.bind(this);
    }


    onDrop = event => {
        var file = event[0];

        var reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            this.setState({
                picture: reader.result,
                file: file,
                visibleImage: true,
                visibleOutput: false,
                visibleSend: true,
                output: ""
            });
        }
    }

    componentWillMount = () => {
        this.index = this.props.index;
        this.url = this.props.url;
    }

    sendImageToServer = () => {
        this.setState({
            visibleImage: false,
            visibleImageUploader: false,
        });

        fetch(this.url + this.index, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Accept': 'image/jpeg'
            },
            method: 'POST',
            body: this.state.file
        })
            .then((response) => {
                return response.status;
            })
            .then((output) => {
                this.setState({
                    output: output,
                    visibleOutput: true,
                    visibleDone: true,
                    visibleSend: false
                });
            })
    }

    finish = () => {
    }

    render() {
        return (
            <div>
                <Panel className="formComponent">
                    <Panel.Heading>
                        <Panel.Title className="text-center" componentClass="h3">Introduzca información</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {this.state.visibleImageUploader && <ImageUploader
                            withIcon={true}
                            buttonText='Elige imagen'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', ' .png', ' .gif']}
                            maxFileSize={5242880}
                        />}
                        <ButtonToolbar>
                            {this.state.visibleSend && <Button bsStyle="success" onClick={this.sendImageToServer}>Enviar</Button>}
                            {this.state.visibleDone && <Button bsStyle="primary" onClick={this.finish}>Hecho</Button>}
                        </ButtonToolbar>
                        {this.state.visibleImage && <Image responsive src={this.state.picture}></Image>}
                        {this.state.visibleOutput && <h1>{this.state.output}</h1>}
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default UploadPhoto;