import React from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MoviesList from './containers/MoviesList';
import MovieForm from './containers/MovieForm';
import ReferenceList from './containers/ReferenceList';
import GenreForm from './containers/GenreForm';
import RoleForm from './containers/RoleForm';
import SubjectForm from './containers/SubjectForm';
import SubjectList from './containers/SubjectList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Mediatheque extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Mediatheque</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavDropdown title="Movies" id="movies-dropdown">
                            <Link className="dropdown-item" to="/movies">Liste</Link>
                            <Link className="dropdown-item" to="/movies/add">Ajouter</Link>
                        </NavDropdown>
                        <NavDropdown title="Subjects" id="subjects-dropdown">
                            <Link className="dropdown-item" to="/subjects">Liste</Link>
                            <Link className="dropdown-item" to="/subjects/add">Ajouter</Link>
                        </NavDropdown>
                        <NavDropdown title="Roles" id="roles-dropdown">
                            <Link className="dropdown-item" to="/reference?reftable=roles">Liste</Link>
                            <Link className="dropdown-item" to="/roles/add">Ajouter</Link>
                        </NavDropdown>
                        <NavDropdown title="Genres" id="genres-dropdown">
                            <Link className="dropdown-item" to="/reference?reftable=genres">Liste</Link>
                            <Link className="dropdown-item" to="/genres/add">Ajouter</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <Route exact path="/" component={MoviesList}/>
                            <Route exact path="/movies" component={MoviesList}/>
                            <Route exact path="/movies/add" component={MovieForm}/>
                            <Route exact path={`/movies/:movieId(\\d+)`} component={MovieForm}/>
                            <Route exact path="/subjects" component={SubjectList}/>
                            <Route exact path="/subjects/add" component={SubjectForm}/>
                            <Route exact path={`/subjects/:entityId(\\d+)`} component={SubjectForm}/>
                            <Route exact path="/roles/add" component={RoleForm}/>
                            <Route exact path={`/roles/:entityId(\\d+)`} component={RoleForm}/>
                            <Route exact path="/genres/add" component={GenreForm}/>
                            <Route exact path={`/genres/:entityId(\\d+)`} component={GenreForm}/>
                            <Route path="/reference" component={ReferenceList}/>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        );
    }
}

export default Mediatheque;
