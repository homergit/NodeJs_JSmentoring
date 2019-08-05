const Device = require('../models/device');
const {sendRequest} = require('../utils/request');

module.exports = {
    getDevices,
    getDeviceById,
    addDevice,
    removeDevice,
    updateDevice
};

function deviceAdapter(device) {
    const {_id, name, address, port, state, log} = device;
    const mappedLog = log.map(deviceLog => {
        return {
            date: deviceLog.date,
            action: deviceLog.action
        }
    });

    return {
        id: _id,
        name,
        address,
        port,
        state,
        log: mappedLog
    }
}


async function getDevices() {
    const devices = await Device.find({}).exec();

    return devices.map(deviceAdapter);
}

async function getDeviceById(deviceId) {
    const device = await Device.findById(deviceId).exec();

    if (device) {
        return deviceAdapter(device)
    } else {
        return null;
    }
}

async function addDevice(deviceData) {
    const device = new Device({
        log: [],
        state: 'off',
        groupId: null,
        ...deviceData
    });

    await device.save();
}

async function removeDevice(deviceId) {
    return await Device.findByIdAndDelete(deviceId).exec();
}

async function updateDevice(deviceId, data) {
    const device = await Device.findById(deviceId);

    if (!device) {
        return null;
    }

    const updatedLog = [...device.log];
    updatedLog.push(data.log);

    if (data.state) {
        await updateDeviceState(
            device.address,
            device.port,
            data.state
        )
    }

    return await Device.findByIdAndUpdate(deviceId, { ...data, log: updatedLog }).exec();
}

async function updateDeviceState(address, port, state) {
    const command = state === 'off' ? 'Power off' : 'Power On';

    const url = `http://${address}:${port}/cm?cmnd=${command}`;
    await sendRequest(url);
}
