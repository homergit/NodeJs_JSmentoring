import axios from 'axios';

const API_URL = 'http://localhost:4000';


export async function getDevices() {
    const response = await axios.get(`${API_URL}/devices`);
    return response.data;
}

export async function getDeviceById(deviceId) {
    const response = await axios.get(`${API_URL}/devices/${deviceId}`);
    return response.data;
}

export async function addDevice(device) {
    const response = await axios.post(`${API_URL}/devices`, device);
    return response.data;
}

export async function removeDevice(deviceId) {
    await axios.delete(`${API_URL}/devices/${deviceId}`);
}

export async function updateDevice(deviceId, data) {
    await axios.patch(`${API_URL}/devices/${deviceId}`, data);
}

export async function switchOn(deviceId) {
    await updateDevice(deviceId, {
        state: 'on',
        log: {
            date: getFormattedDate(),
            action: 'on'
        }
    });
}

export async function switchOff(deviceId) {
    await updateDevice(deviceId, {
        state: 'off',
        log: {
            date: getFormattedDate(),
            action: 'off'
        }
    });
}

export async function getDeviceLog(deviceId) {
    const response = await axios.get(`${API_URL}/devices/log/${deviceId}`);
    return response.data;
}

export async function getGroups() {
    const response = await axios.get(`${API_URL}/groups`);
    return response.data;
}

export async function getGroupById(groupId) {
    const response = await axios.get(`${API_URL}/groups/${groupId}`);
    return response.data;
}

export async function addGroup(group) {
    const response = await axios.post(`${API_URL}/groups`, group);
    return response.data;
}

export async function removeGroup(groupId) {
    await axios.delete(`${API_URL}/groups/${groupId}`);
}

export async function updateGroup(groupId, data) {
    await axios.patch(`${API_URL}/groups/${groupId}`, data);
}

export async function switchGroupState(groupId, state) {
    await axios.patch(`${API_URL}/groups/state/${groupId}`, {
        state,
        log: {
            date: getFormattedDate(),
            action: state
        }
    });
}

function getFormattedDate() {
    let date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
