import useStore from "../store/useStore";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Account.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Profile from "../components/account/Profile";
import ProductManagement from "../components/account/ProductManagement";

const SelectCard = ({name, setSelect}) => {
    return (
        <div className={styles.selectCard} onClick={() => setSelect(name)}>
            <FontAwesomeIcon className={styles.icon} icon={faChevronDown} /> {name}
        </div>
    )
}

function Account() {
    const { state } = useStore()
    const [user, setUser] = useState({})
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()

    const [select, setSelect] = useState('');

    useEffect(() => {
        let isMounted = true;
        
        const getUser = async () => {
            try {
                const res = await axiosPrivate.post('/account', {
                    email: state.userInfo.email,
                    token: state.userInfo.token
                })

                isMounted && setUser(res.data)
                
            } catch(err) {
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true})
            }
        }

        getUser()

        setSelect('Profile')

        return () => {
            isMounted = false;
        }
    }, [user])

    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <div className={styles.info}>
                    <img />
                    <h4>{user.username}</h4>
                    <p>{user.email}</p>
                </div>
                <div className={`${styles.info} ${styles.selection}`}>
                    {
                        Array.isArray(user.options) && user.options.map((item, index) => (
                            <SelectCard key={index} name={item} setSelect={setSelect} />
                        ))
                    }
                </div>
            </div>

            <div className={styles.content}>
                {select === 'Profile' && <Profile user={user} />}
                {/* {select === 'Product Management' && useMemo(() => {return (<ProductManagement />)})} */}
            </div>
        </div>
    );
}

export default Account;