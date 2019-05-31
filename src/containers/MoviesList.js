import React from 'react';
import mediathequeApi from '../api/mediathequeApi';
import List from '../components/List';

class MoviesList extends React.Component {

    state = {
        movies: [],
        header: ['Titre', 'Date de sortie', 'Durée (en secondes)'],
        customStyle: {striped: true, hover: true},
        columnsToDisplay: ['title', 'releaseDate', 'duration'],
        actionUrl: {
            'update': mediathequeApi.updateMovie,
            'delete': mediathequeApi.deleteMovie
        },
        listChanged: false
    };

    listHandler = () => {
        this.setState({
            listChanged: true
        });
    };

    render() {

        const {movies, header, customStyle, columnsToDisplay, actionUrl} = this.state;

        return (
            <List
                header={header}
                content={movies}
                customStyle={customStyle}
                columnsToDisplay={columnsToDisplay}
                addActions={actionUrl}
                listHandler={this.listHandler}
            />
        );
    }

    componentDidMount() {
        this._reload();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.listChanged) {
            this._reload()
        }
    }

    _reload() {
        mediathequeApi.getAllMovies()
            .then(response => {
                if (!response.empty) {
                    this.setState({
                        movies: response.data.content,
                        listChanged: false
                    });
                    console.log(response.data.content);
                }
            }).catch(error => {
            console.error(error);
        });
    }
}

export default MoviesList;