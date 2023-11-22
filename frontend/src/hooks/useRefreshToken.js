import useStore from "../store/useStore";
import useAxiosPrivate from './useAxiosPrivate';

function useRefreshToken() {
    const { dispatch } = useStore()
    const axiosPrivate = useAxiosPrivate()

    const refresh = async () => {
        const res = await axiosPrivate.post('/refresh')
        dispatch({
            type: 'REFRESH_TOKEN',
            payload: {
                email: res.data.email,
                token: res.data.accessToken,
                cartLength: res.data.cartLength
            }
        })
        return res.data.accessToken
    }

    return refresh
}

export default useRefreshToken;