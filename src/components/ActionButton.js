import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Link} from "react-router-dom";

class ActionButton extends React.Component {

    static propTypes = {
        entityId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        preview: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        update: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        deletion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        handler: PropTypes.func
    };

    static defaultProps = {
        entityId: false,
        preview: false,
        update: false,
        deletion: false,
        handler: () => {
        }
    };

    render() {
        const {preview, update, deletion} = this.props;

        return (
            <ButtonGroup>
                {preview && <Button variant="secondary">Preview</Button>}
                {update && <Link className="btn btn-secondary" to={update + `/${this.props.entityId}`}>Modifier</Link>}
                {deletion && <Button onClick={this._deleteRequest} variant="secondary">Supprimer</Button>}
            </ButtonGroup>
        );
    }

    _deleteRequest = () => {
        const {deletion, entityId, handler} = this.props;
        deletion(entityId).then((response) => {
            if (response.status === 200) {
                handler();
            }
        }).catch((error) => {
            console.error(error);
        });
    };
}

export default ActionButton;