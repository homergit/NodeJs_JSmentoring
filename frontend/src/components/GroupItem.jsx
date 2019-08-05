import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {removeGroup, switchGroupState} from "../api";

export default class GroupItem extends PureComponent {
    handleDelete = async () => {
        const {group, onUpdate} = this.props;

        await removeGroup(group.id);
        onUpdate();
    };

    handleStateChange = async (state) => {
        const {group, onUpdate} = this.props;

        await switchGroupState(group.id, state)
        onUpdate();
    }

    render() {
        const {index, group} = this.props;

        return (
            <tr key={group.id}>
                <th scope="row">{index}</th>
                <td>{group.name}</td>
                <td className="text-right">
                    <div className="btn-group mr-4" role="group">
                        <button type="button"
                                onClick={() => this.handleStateChange('on')}
                                className={`btn btn-outline-primary ${group.state === 'on' ? 'active' : ''}`}>
                            On
                        </button>
                        <button type="button"
                                onClick={() => this.handleStateChange('off')}
                                className={`btn btn-outline-primary ${group.state === 'off' ? 'active' : ''}`}>
                            Off
                        </button>
                    </div>

                    <div className="btn-group" role="group">
                        <a href={`#/groups/edit/${group.id}`} className="btn btn-outline-secondary">Edit</a>
                        <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }
}

GroupItem.defaultProps = {
    onUpdate: () => {}
};

GroupItem.propTypes = {
    group: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func
};
