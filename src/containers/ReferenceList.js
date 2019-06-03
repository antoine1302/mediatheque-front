import React from 'react';
import List from '../components/List';
import mediathequeApi from '../api/mediathequeApi';
import {toUppercaseFirstString} from '../modules/utils';


class ReferenceList extends React.Component {

    state = {
        list: [],
        header: ['Titre', 'Code', 'Poids', 'Actif'],
        columnsToDisplay: ['title', 'code', 'weight', 'enabled'],
        customStyle: {striped: true, hover: true},
        listChanged: false,
        actionUrl: {
            'update': '',
            'delete': () => {
            }
        },
        currentRefTable: ''
    };

    render() {

        const {list, header, customStyle, columnsToDisplay, actionUrl} = this.state;

        return (
            <List
                header={header}
                content={list}
                customStyle={customStyle}
                columnsToDisplay={columnsToDisplay}
                addActions={actionUrl}
                listHandler={this.listHandler}
            />
        );
    }

    listHandler = () => {
        this.setState({
            listChanged: true
        });
    };

    componentDidMount() {
        this._loadList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {location} = this.props;
        const params = new URLSearchParams(location.search);
        const refTable = params.get('reftable');

        if (this.state.currentRefTable !== refTable) {
            this._loadList();
        }

        if (this.state.listChanged) {
            this._loadList();
        }
    }

    _loadList() {
        const {location} = this.props;
        const params = new URLSearchParams(location.search);
        const refTable = params.get('reftable');
        const methodToCall = 'getAll' + toUppercaseFirstString(refTable);

        mediathequeApi[methodToCall]().then((response) => {
            if (!response.empty) {
                this.setState({
                    list: response.data.content,
                    listChanged: false,
                    actionUrl: {
                        update: refTable,
                        delete: mediathequeApi['delete' + toUppercaseFirstString(refTable)]
                    },
                    currentRefTable: refTable
                });
            }
        }).catch((error) => {
            console.error(error);
        });

    }
}

export default ReferenceList;