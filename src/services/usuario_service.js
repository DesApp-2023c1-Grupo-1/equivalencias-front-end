import axios from 'axios';
import { config } from '../config/config';

export async function getUsuario(id) {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/${id}`);
    return apiResponse.data;
}

export async function getUsuarios() {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/todos`);
    return apiResponse.data;
}

export async function postUsuario(usuario) {
    const apiResponse = await axios.post(`${config.apiUrl}/usuarios`, usuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return apiResponse.data;
}
