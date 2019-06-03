import React from 'react';
import mediathequeApi from "../api/mediathequeApi";
import List from "../components/List";

class SubjectList extends React.Component {

    state = {
        subjects: [],
        header: ['Nom', 'Prénom', 'Date de naissance'],
        columnsToDisplay: ['lastname', 'firstname', 'dateOfBirth'],
        customStyle: {striped: true, hover: true},
        actionUrl: {
            'update': '/subjects',
            'delete': mediathequeApi.deleteSubject
        },
        listChanged: false
    };

    listHandler = () => {
        this.setState({
            listChanged: true
        });
    };

    render() {
        const {subjects, header, customStyle, columnsToDisplay, actionUrl} = this.state;

        return (
            <List
                header={header}
                content={subjects}
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
        mediathequeApi.getAllSubjects()
            .then(response => {
                if (!response.empty) {
                    this.setState({
                        subjects: response.data.content,
                        listChanged: false
                    });
                }
            }).catch(error => {
            console.error(error);
        });
    }
}

export default SubjectList;