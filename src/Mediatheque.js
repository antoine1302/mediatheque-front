import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MoviesList from './containers/MoviesList';
import MovieForm from './containers/MovieForm';
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
                            <Link className="dropdown-item" to="/movies" >Liste</Link>
                            <Link className="dropdown-item" to="/movies/add" >Ajouter</Link>
                        </NavDropdown>
                        <NavDropdown title="Subjects" id="subjects-dropdown">
                            <Link className="dropdown-item" to="/subjects" >Liste</Link>
                            <Link className="dropdown-item" to="/subjects/add" >Ajouter</Link>
                        </NavDropdown>
                        <NavDropdown title="Roles" id="roles-dropdown">
                            <Link className="dropdown-item" to="/roles" >Liste</Link>
                            <Link className="dropdown-item" to="/roles/add" >Ajouter</Link>
                        </NavDropdown>
                        <NavDropdown title="Genres" id="genres-dropdown">
                            <Link className="dropdown-item" to="/genres" >Liste</Link>
                            <Link className="dropdown-item" to="/genres/add" >Ajouter</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <Route exact path="/" component={MoviesList} />
                            <Route exact path="/movies" component={MoviesList} />
                            <Route exact path="/movies/add" component={MovieForm}/>
                            <Route exact path="/subjects" component={MoviesList}/>
                            <Route exact path="/subjects/add" component={MoviesList}/>
                            <Route exact path="/roles" component={MoviesList}/>
                            <Route exact path="/roles/add" component={MoviesList}/>
                            <Route exact path="/genres" component={MoviesList}/>
                            <Route exact path="/genres/add" component={MoviesList}/>
                            <Route exact path={`/movies/:movieId(\\d+)`} component={MovieForm}/>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        );
    }
}

export default Mediatheque;
