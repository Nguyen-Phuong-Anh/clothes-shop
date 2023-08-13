import axios from 'axios'
import useStore from '../store/useStore';

function useLogout() {
    const { dispatch } = useStore()

    const logout = async () => {
        dispatch({
            type: "LOG_OUT"
        })

        try {
            const res = await axios('/logout', {
                withCredentials: true
            })
        } catch(err) {
            console.error(err)
        }
    }
   
    return logout;
}

export default useLogout;