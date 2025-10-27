import { BASE_API_URL } from "../constants";
import { useAuth } from "../context/authContext";


// a hook that makes requests and inserts auth in body. If it doesn't work it tries to refresh. 
// returns an empty object if it can't refresh
const useFetchRefresh = async (url: string, method: string, headers?: Record<string, any>, body?: Record<string, any> | HTMLFormElement) => {
    const { accessToken, login } = useAuth();

    let newBody;
    if (body instanceof HTMLFormElement) {
        newBody = new FormData(body);
        newBody.append('auth', accessToken || '')
    } else {
        newBody = JSON.stringify({ ...body, auth: accessToken });
    }

    const requestData = {
        method: method,
        headers: headers,
        body: newBody
    }
    let response = await fetch(url, requestData);

    // if failed due to invalid token try to refresh
    if (response.status === 401) {
        const refreshResponse = await fetch(BASE_API_URL + '/refresh', {
            method: 'POST',
            headers: {
                credentials: 'include'
            }
        })
        if (refreshResponse.status === 401) {
            return {}
        }

        const parsedRefresh = await refreshResponse.json();
        login(parsedRefresh);

        // make new request
        let newBody;
        if (body instanceof HTMLFormElement) {
            newBody = new FormData(body);
            newBody.append('auth', accessToken || '')
        } else {
            newBody = JSON.stringify({ ...body, auth: accessToken });
        }

        response = await fetch(url, {
            method: method,
            headers: headers,
            body:newBody
        })
    }

    const parsedResponse = await response.json();
    return parsedResponse;
}



export default useFetchRefresh;