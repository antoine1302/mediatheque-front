import axios from 'axios';
import {urlMovies, urlGenres, urlRoles, urlSubjects} from '../modules/config';

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

    static getAllSubjects() {
        return axios.get(urlSubjects);
    }

    /****** Roles *****/

    static getAllActiveRoles() {
        return axios.get(urlRoles + '/list');
    }
}

export default mediathequeApi;