import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ReferenceForm extends React.Component {

    static propTypes = {
        match: PropTypes.object
    };

    static defaultProps = {
        match: {}
    };

    state = {
        refTable: '',
        currentReference: {},
        submitError: false,
        isLoading: false,
        isSubmit: false
    };

    render() {
        const {currentReference} = this.state;

        return (
            <Form className="referenceForm" onSubmit={this._formSubmitHandler}>
                {currentReference.id && <input name="id" type="hidden" defaultValue={currentReference.id}/>}
                <Form.Group controlId="title">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Entrer le titre"
                        defaultValue={currentReference.title}
                    />
                </Form.Group>
                <Form.Group controlId="code">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                        name="code"
                        type="text"
                        placeholder="Entrer un code"
                        defaultValue={currentReference.code}
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        type="textarea"
                        placeholder="description"
                        defaultValue={currentReference.description}
                    />
                </Form.Group>
                <Form.Group controlId="weight">
                    <Form.Label>Poids</Form.Label>
                    <Form.Control
                        name="weight"
                        type="text"
                        placeholder="Poids"
                        defaultValue={currentReference.weight}
                    />
                </Form.Group>
                <Form.Group controlId="enabled">
                    <Form.Check type="checkbox" label="Enabled" name="enabled" defaultValue={currentReference.enabled}
                                value={currentReference.enabled}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }

    componentDidMount() {
        this._loadReference();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isSubmit === true) {
            this.setState({
                isSubmit: false
            });
        }
    }
}

export default ReferenceForm;