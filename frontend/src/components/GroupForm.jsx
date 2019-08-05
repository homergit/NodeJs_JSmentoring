import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';
import { getDevices } from '../api';

export default class GroupForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            selectedDevices: [],
            group: {...props.group}
        }
    }

    componentDidMount() {
        this.loadDevices();
    }

    loadDevices = async () => {
        const { group } = this.state;
        const devices = await getDevices();
        const filteredDevices = devices.filter(device => group.devices.indexOf(device.id) === -1);
        const selectedDevices = devices.filter(device => group.devices.indexOf(device.id) !== -1);

        this.setState({
            devices: [...filteredDevices],
            selectedDevices: [...selectedDevices]
        })
    };

    addDevice = (event) => {
        const {group} = this.state;
        const {devices, selectedDevices} = this.state;
        const deviceId = event.target.value;
        const index = devices.findIndex(device => device.id === deviceId);
        const selectedDevice = devices.splice(index, 1);
        const updatedGroupDevices = [...group.devices, deviceId];
        event.target.value = null;
        this.setState({
            devices: [...devices],
            selectedDevices: [...selectedDevices, selectedDevice[0]],
            group: {
                ...group,
                devices: updatedGroupDevices
            }
        });
    };

    removeDevice = (id) => {
        const {group} = this.state;
        const {devices, selectedDevices} = this.state;
        const index = selectedDevices.findIndex(device => device.id === id);
        const removedDevice = selectedDevices.splice(index, 1);
        const updatedGroupDevices = group.devices.filter(device => device.id !== id);
        this.setState({
            devices: [...devices, removedDevice[0]],
            selectedDevices: [...selectedDevices],
            group: {
                ...group,
                devices: updatedGroupDevices
            }
        });
    };

    handleCancel = () => {
        window.history.back();
    };

    addGroup = (event) => {
        this.props.onSubmit({
            ...this.state.group,
            name: event.target.groupName.value
        });

        event.preventDefault();
    };

    render() {
        const {devices, selectedDevices, group} = this.state;

        return (
            <form onSubmit={this.addGroup}>
                 <div className="form-group">
                    <label htmlFor="deviceName">Group Name</label>
                    <input type="text"
                            className="form-control"
                            id="groupName"
                            name="groupName"
                            placeholder="Group Name"
                            required
                            defaultValue={group.name}
                    />
                </div>
                <div className="form-group">
                    <label>Add devices to group</label>
                    <select className="form-control"
                            onChange={this.addDevice}
                    >
                        <option value={null}>
                            Select device
                        </option>
                        {   
                            devices.map(device => {
                                    return (
                                        <option
                                            value={device.id}
                                            key={device.id}
                                        >
                                            {device.name}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>
                <ul className="list-group" style={{marginBottom:'1.5rem'}}>
                    {
                        !!selectedDevices.length && selectedDevices.map((device, index) =>
                        <li className="list-group-item" key={index}>
                            {device.name}
                            <button type="button" 
                                    className="close"
                                    aria-label="Close" 
                                    onClick={() => {this.removeDevice(device.id)}}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </li>
                    )}
                </ul>

                <div className="float-right">
                    <button 
                            type="submit" 
                            className="btn btn-primary mr-2"
                    >
                        Submit  
                    </button>
                    <button type="button" 
                            className="btn btn-default" 
                            onClick={this.handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }
}

GroupForm.defaultProps = {
    group: {
        name: '',
        devices: []
    }
};

GroupForm.propTypes = {
    group: groupPropType,
    onSubmit: PropTypes.func.isRequired
};
