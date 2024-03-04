
import axios from './axios'

export const loginApi = async (data) => {
    try {
        return await axios.post("/auth/login", data);
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
};
export const registerApi = async (data) => {
    try {
        let response = await axios.post("/auth/register", data);
        return response;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
};

export const getAllFolder = async (id: string) => {
    try {
        let response = await axios.post("/drive/get-all-folder", {
            userId: id,
        });
        return response;
    } catch (exception) {
        return {
            err: true,
            exception,
        };
    }
};

export const createFolder = async (name: string, parentId: string, userId: string, path: string) => {
    try {
        let response = await axios.post("/drive/create-folder", {
            name,
            parentId,
            userId,
            path,
        });
        return response;
    } catch (exception) {
        return {
            err: true,
            exception,
        };
    }
};

const regex2nfa = async (regex) => {
    try {
        let response = await axios.post('/regex-to-nfa', { regex: regex })
        return response
    } catch (exception) {
        return {
            err: true,
            exception
        }
    }
}
const nfa2dfa = async (nfa) => {
    try {
        let response = await axios.post('/nfa-to-dfa', { nfa: nfa })
        return response
    } catch (exception) {
        return {
            err: true,
            exception
        }
    }
}

const dfa2regex = async (dfa) => {
    try {
        let response = await axios.post('/dfa-to-regex', { dfa: dfa })
        return response
    } catch (exception) {
        return {
            err: true,
            exception
        }
    }
}

export default {
    regex2nfa, nfa2dfa, dfa2regex
}