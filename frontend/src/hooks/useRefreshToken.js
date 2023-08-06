import axios from 'axios'
import useStore from "../store/useStore";

function useRefreshToken() {
    const { dispatch } = useStore()

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