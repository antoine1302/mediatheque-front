import React from 'react';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediathequeApi from "../api/mediathequeApi";
import {collectionAsKeyValue} from "../modules/utils";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PropTypes from 'prop-types';


class SubjectRole extends React.Component {

    static propTypes = {
        index: PropTypes.number,
        deleteSubjectHandler: PropTypes.func,
        className: PropTypes.string,
        selectedRoleId: PropTypes.number,
        selectedSubjectId: PropTypes.number
    };

    static defaultProps = {
        index: 1,
        deleteSubjectHandler: () => {
        },
        className: 'subjectMovieRow',
        selectedRoleId: null,
        selectedSubjectId: null
    };

    state = {
        rolesList: [],
        subjectsList: [],
        selectedRoleOption: null,
        selectedSubjectOption: null
    };

    render() {

        const {rolesList, subjectsList, selectedSubjectOption, selectedRoleOption} = this.state;
        const {index} = this.props;

        return (
            <Row className={this.props.className}>
                <Col>
                    <Form.Group>
                        <Form.Label>Participants</Form.Label>
                        <Select
                            name={`subjectMovies[${index}][subjectId]`}
                            options={subjectsList}
                            value={selectedSubjectOption}
                            onChange={this.onChangeSubjectHandler}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Roles</Form.Label>
                        <Select
                            name={`subjectMovies[${index}][roleId]`}
                            options={rolesList}
                            value={selectedRoleOption}
                            onChange={this.onChangeRoleHandler}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <ButtonToolbar>
                        <Button onClick={this._removeRow} size="sm">Supprimer</Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        );
    }

    onChangeRoleHandler = (selectedOption) => {
        console.log(selectedOption);
        this.setState({
            selectedRoleOption: selectedOption
        });
    };

    onChangeSubjectHandler = (selectedOption) => {
        this.setState({
            selectedSubjectOption: selectedOption
        });
    };

    componentDidMount() {
        this._loadSubjects();
        this._loadRoles();
    }

    _loadSubjects() {
        MediathequeApi.getAllSubjects().then((response) => {
            if (response.status === 200) {
                const selectList = collectionAsKeyValue(response.data.content, 'id', ['firstname', 'lastname']);
                const {selectedSubjectId} = this.props;
                const selectedObj = this._getSelectedObjFromIndex(selectList, selectedSubjectId);

                this.setState({
                    subjectsList: selectList,
                    selectedSubjectOption: selectedObj
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    _loadRoles() {
        MediathequeApi.getAllActiveRoles().then((response) => {
            if (response.status === 200) {
                const selectList = collectionAsKeyValue(response.data, 'id', ['title']);
                const {selectedRoleId} = this.props;
                const selectedObj = this._getSelectedObjFromIndex(selectList, selectedRoleId);

                this.setState({
                    rolesList: selectList,
                    selectedRoleOption: selectedObj
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    _removeRow = () => {
        const {deleteSubjectHandler, index} = this.props;
        deleteSubjectHandler(index);
    };

    _getSelectedObjFromIndex(objList, indexKeyToFind) {
        let selectedObj = null;

        for (let i = 0; i < objList.length; i++) {
            if (objList[i].value === String(indexKeyToFind)) {
                selectedObj = objList[i];
                break;
            }
        }

        return selectedObj;
    }
}

export default SubjectRole;