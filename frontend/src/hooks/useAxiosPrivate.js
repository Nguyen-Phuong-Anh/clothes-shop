import axiosPrivate from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useContext } from 'react';
import { Store } from '../store/Store';

function useAxiosPrivate() {
    const [state, dispatch] = useContext(Store)
    const refresh = useRefreshToken()

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${state?.token}`
                }
                return config;
            }, (err) => Promise.reject(err)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            res => res,
            async (err) => {
                const prevRequest = err?.config
                if(err?.response.status === 403 && !prevRequest?.sent) {
                    //the status is 403 and the request wasn't sent
                    prevRequest.sent = true
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(err)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [state, refresh])


    return (<></>);
}

export default useAxiosPrivate;