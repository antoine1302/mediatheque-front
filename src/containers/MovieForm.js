import React from 'react';
import PropTypes from 'prop-types';
import MediathequeApi from '../api/mediathequeApi';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import SubjectRole from './SubjectRole';
import {arrayRemove} from '../modules/utils';

class MovieForm extends React.Component {

    static propTypes = {
        match: PropTypes.object
    };

    static defaultProps = {
        match: {}
    };

    state = {
        currentMovie: {},
        subjectsRolesList: [],
        submitError: false,
        isLoading: false,
        isSubmit: false
    };

    render() {

        const {currentMovie, subjectsRolesList} = this.state;
        return (
            <Form className="movieForm" onSubmit={this._formSubmitHandler}>
                {currentMovie.id && <input name="id" type="hidden" defaultValue={currentMovie.id}/>}
                <Form.Group controlId="title">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Entrer le nom du film"
                        defaultValue={currentMovie.title}
                    />
                </Form.Group>
                <Form.Group controlId="duration">
                    <Form.Label>Durée (en secondes)</Form.Label>
                    <Form.Control
                        name="duration"
                        type="text"
                        placeholder="Entrer la durée du film (en minutes)"
                        defaultValue={currentMovie.duration}
                    />
                </Form.Group>
                <Form.Group controlId="dateOfRelease">
                    <Form.Label>Date de sortie</Form.Label>
                    <Form.Control
                        name="releaseDate"
                        type="text"
                        placeholder="Date de sortie (YYYY-MM-DD)"
                        defaultValue={currentMovie.releaseDate}
                    />
                </Form.Group>
                <Form.Group controlId="synopsis">
                    <Form.Label>Synopsis</Form.Label>
                    <Form.Control
                        name="synopsis"
                        type="textarea"
                        placeholder="synopsis"
                        defaultValue={currentMovie.synopsis}
                    />
                </Form.Group>
                <ButtonToolbar>
                    <Button id="addSubject" onClick={this._addSubjectRole} variant="primary">
                        Add participant
                    </Button>
                </ButtonToolbar>
                {subjectsRolesList.map((element, i) => {

                    const roleId = (element === 'new') ? null : element.id.roleId;
                    const subjectId = (element === 'new') ? null : element.id.subjectId;

                    return <SubjectRole
                        className="subjectMovieRow"
                        key={i}
                        index={i}
                        deleteSubjectHandler={this._removeSubjectRole}
                        selectedRoleId={roleId}
                        selectedSubjectId={subjectId}
                    />
                })}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }

    componentDidMount() {
        this._loadMovie();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isSubmit === true) {
            this.setState({
                isSubmit: false
            });
        }
    }

    _loadMovie() {
        const {match} = this.props;

        if (match.params.movieId !== undefined) {
            MediathequeApi.getMovie(match.params.movieId).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        currentMovie: response.data,
                        subjectsRolesList: response.data.subjectMovies
                    });

                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    _addSubjectRole = () => {

        let {subjectsRolesList} = this.state;
        subjectsRolesList.push('new');

        this.setState({
            subjectsRolesList: subjectsRolesList
        })
    };

    _removeSubjectRole = (index) => {
        let {subjectsRolesList} = this.state;
        subjectsRolesList = arrayRemove(subjectsRolesList, index);

        this.setState({
            subjectsRolesList: subjectsRolesList
        })
    };

    _formSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const id = data.get('id');

        const subjectMovies = this._getSubjectMoviesList();

        const objData = {
            id: data.get('id'),
            title: data.get('title'),
            synopsis: data.get('synopsis'),
            releaseDate: data.get('releaseDate'),
            duration: data.get('duration'),
            subjectMovies: subjectMovies
        };

        if (id !== null) {
            MediathequeApi.updateMovie(id, objData).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isSubmit: true
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            MediathequeApi.createMovie(objData).then((response) => {
                if (response.status === 200) {
                    this.props.history.push('/movies/' + response.data.id)
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    _getSubjectMoviesList() {
        const subjectMoviesRow = document.querySelectorAll('.subjectMovieRow');

        let subjectMovies = [];
        subjectMoviesRow.forEach((elmt, i) => {
            const subjectId = elmt.querySelector('input[name="subjectMovies[' + i + '][subjectId]"').value;
            const roleId = elmt.querySelector('input[name="subjectMovies[' + i + '][roleId]"').value;
            subjectMovies.push({
                id: {
                    subjectId: subjectId,
                    roleId: roleId
                }
            });
        });

        return subjectMovies;
    }
}

export default MovieForm;