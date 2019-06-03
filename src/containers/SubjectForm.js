import React from 'react';
import MediathequeApi from "../api/mediathequeApi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SubjectForm extends React.Component {

    state = {
        currentSubject: {}
    };

    render() {

        const {currentSubject} = this.state;

        return (
            <Form className="subjectForm" onSubmit={this._formSubmitHandler}>
                {currentSubject.id && <input name="id" type="hidden" defaultValue={currentSubject.id}/>}
                <Form.Group controlId="firstname">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                        name="firstname"
                        type="text"
                        placeholder="Entrer le prénom"
                        defaultValue={currentSubject.firstname}
                    />
                </Form.Group>
                <Form.Group controlId="lastname">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        name="lastname"
                        type="text"
                        placeholder="Entrer le nom"
                        defaultValue={currentSubject.lastname}
                    />
                </Form.Group>
                <Form.Group controlId="citizenship">
                    <Form.Label>Nationalité</Form.Label>
                    <Form.Control
                        name="citizenship"
                        type="text"
                        placeholder="nationalité"
                        defaultValue={currentSubject.citizenship}
                    />
                </Form.Group>
                <Form.Group controlId="dateOfBirth">
                    <Form.Label>Date de naissance</Form.Label>
                    <Form.Control
                        name="dateOfBirth"
                        type="text"
                        placeholder="Date de naissance (YYYY-MM-DD)"
                        defaultValue={currentSubject.dateOfBirth}
                    />
                </Form.Group>
                <Form.Group controlId="placeOfBirth">
                    <Form.Label>Lieu de naissance</Form.Label>
                    <Form.Control
                        name="placeOfBirth"
                        type="text"
                        placeholder="Lieu de naissance"
                        defaultValue={currentSubject.placeOfBirth}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }

    componentDidMount() {
        this._loadSubject();
    }

    _loadSubject() {
        const {match} = this.props;

        if (match.params.entityId !== undefined) {
            MediathequeApi.getSubject(match.params.entityId).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        currentSubject: response.data,
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    _formSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const id = data.get('id');
        const objData = {
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            dateOfBirth: data.get('dateOfBirth'),
            placeOfBirth: data.get('placeOfBirth'),
            citizenship: data.get('citizenship')
        };

        if (id !== null) {
            MediathequeApi.updateSubject(id, objData).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isSubmit: true
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            MediathequeApi.createSubject(objData).then((response) => {
                if (response.status === 200) {
                    this.props.history.push('/subjects/' + response.data.id)
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    };
}

export default SubjectForm;