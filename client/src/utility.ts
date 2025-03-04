import axios from "axios";

export async function fetchData(endpoint: string, method: string, data?: object) {
    try {
        const baseUrl = import.meta.VITE_BACKEND_URL as ImportMeta || 'http://localhost:3000';
        let result;

        switch(method) {
            case 'POST':
                result = await axios.post(baseUrl + endpoint, data);
                return result;
            default: 
                result = await axios.get(baseUrl + endpoint);
                return result;
        }
    } catch (error: unknown) {
        return error;
    }
}