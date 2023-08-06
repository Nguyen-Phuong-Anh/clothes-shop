import useStore from "../store/useStore";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function Account() {
    const { state } = useStore()
    const [user, setUser] = useState()
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true;
        
        const getUser = async () => {
            try {
                const res = await axiosPrivate.post('/account', {
                    email: state.userInfo.email
                })

                isMounted && setUser(res.data)
                
            } catch(err) {
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true})
            }
        }

        getUser()

        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <div>
            fslkfj
        </div>
    );
}

export default Account;