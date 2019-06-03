import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import ActionButton from './ActionButton';

class List extends React.Component {

    static propTypes = {
        header: PropTypes.arrayOf(PropTypes.string),
        content: PropTypes.arrayOf(PropTypes.object),
        customStyle: PropTypes.oneOfType([PropTypes.shape({
            striped: PropTypes.bool,
            bordered: PropTypes.bool,
            hover: PropTypes.bool
        }), PropTypes.bool]),
        columnsToDisplay: PropTypes.array,
        addActions: PropTypes.oneOfType([
            PropTypes.shape({
                update: PropTypes.string,
                delete: PropTypes.func,
                preview: PropTypes.func
            })
        ], PropTypes.bool),
        listHandler: PropTypes.func
    };

    static defaultProps = {
        header: [],
        content: [],
        customStyle: {
            striped: false,
            bordered: false,
            hover: false
        },
        columnsToDisplay: [],
        addActions: true,
        listHandler: () => {
        }
    };

    render() {

        const {header, content, customStyle} = this.props;

        if (content.length <= 0) {
            return (<div>Aucune données</div>);
        }

        return (
            <Table striped={customStyle.striped} bordered={customStyle.bordered} hover={customStyle.hover}>
                {(header.length > 0 && this._renderHeader(header))}
                {this._renderBody(content)}
            </Table>
        );
    }

    _renderHeader(header) {

        if (this.props.addActions === true) {
            header.push('Actions');
        }

        return (
            <thead>
            <tr>
                {header.map((title, i) => {
                    const uKey = i;
                    return <th key={uKey}>{title}</th>;
                })}
            </tr>
            </thead>
        );
    }

    _renderBody(content) {
        return (
            <tbody>
            {content.map((currentObj, i) => {
                return this._renderLine(currentObj, i);
            })}
            </tbody>
        );
    }

    _renderLine(obj, key) {
        const {columnsToDisplay, addActions, listHandler} = this.props;

        key = (typeof obj.id === 'undefined') ? key : obj.id;

        return (
            <tr key={key}>
                {columnsToDisplay.map((colname) => {
                    return <td key={colname + key}>{obj[colname]}</td>;
                })}
                {this.props.addActions &&
                <td>
                    <ActionButton
                        handler={listHandler}
                        entityId={obj.id}
                        update={addActions.update}
                        deletion={addActions.delete}
                    />
                </td>}
            </tr>
        );

    }
}

export default List;