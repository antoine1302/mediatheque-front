import axios from 'axios';
import {urlGenres, urlMovies, urlRoles, urlSubjects} from '../modules/config';

class mediathequeApi {

    static config = {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {}
    };

    /***** Movies *****/
    static getAllMovies() {
        return axios.get(urlMovies);
    }

    static getMovie(movieId) {
        return axios.get(urlMovies + '/' + movieId);
    }

    static deleteMovie(movieId) {
        return axios.delete(urlMovies + '/' + movieId);
    }

    static createMovie(data) {
        return axios.post(urlMovies, data, this.config);
    }

    static updateMovie(movieId, data) {
        return axios.put(urlMovies + '/' + movieId, data, this.config);
    }

    /***** Subjects *****/

    static getSubject(subjectId) {
        return axios.get(urlSubjects + '/' + subjectId)
    }

    static createSubject(data) {
        return axios.post(urlSubjects, data, this.config);
    }

    static updateSubject(subjectId, data) {
        return axios.put(urlSubjects + '/' + subjectId, data, this.config);
    }

    static getAllSubjects() {
        return axios.get(urlSubjects);
    }

    static deleteSubject(subjectId) {
        return axios.delete(urlSubjects + '/' + subjectId);
    }

    /****** Roles *****/

    static getRole(roleId) {
        return axios.get(urlRoles + '/' + roleId);
    }

    static createRole(data) {
        return axios.post(urlRoles, data, this.config);
    }

    static updateRole(roleId, data) {
        return axios.put(urlRoles + '/' + roleId, data, this.config);
    }

    static getAllActiveRoles() {
        return axios.get(urlRoles + '/list');
    }

    static getAllRoles() {
        return axios.get(urlRoles);
    }

    static deleteRoles(roleId) {
        return axios.delete(urlRoles + '/' + roleId);
    }

    /***** Genres *****/

    static getGenre(genreId) {
        return axios.get(urlGenres + '/' + genreId);
    }

    static createGenre(data) {
        return axios.post(urlGenres, data, this.config);
    }

    static updateGenre(genreId, data) {
        return axios.put(urlGenres + '/' + genreId, data, this.config);
    }

    static getAllActiveGenres() {
        return axios.get(urlGenres + '/list');
    }

    static getAllGenres() {
        return axios.get(urlGenres);
    }

    static deleteGenres(genreId) {
        return axios.delete(urlGenres + '/' + genreId);
    }
}

export default mediathequeApi;