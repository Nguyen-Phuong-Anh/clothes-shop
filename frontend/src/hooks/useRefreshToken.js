import axios from 'axios'
import { useContext } from 'react';
import { Store } from '../store/Store';

function useRefreshToken() {
    const [state, dispatch] = useContext(Store)

    const refresh = async () => {
        const res = await axios.get('/refresh', {
            withCredentials: true
        })
        dispatch({
            type: 'LOG_IN',
            payload: res.data.accessToken
        })
        return res.data.accessToken
    }

    return refresh
}

export default useRefreshToken;