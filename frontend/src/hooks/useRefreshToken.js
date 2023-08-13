import axios from 'axios'
import useStore from "../store/useStore";

function useRefreshToken() {
    const { dispatch } = useStore()

    const refresh = async () => {
        const res = await axios.post('/refresh', {
            withCredentials: true
        })
        dispatch({
            type: 'REFRESH_TOKEN',
            payload: res.data.accessToken
        })
        return res.data.accessToken
    }

    return refresh
}

export default useRefreshToken;