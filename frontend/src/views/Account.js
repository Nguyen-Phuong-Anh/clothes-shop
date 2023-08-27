import useStore from "../store/useStore";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Account.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Profile from "../components/account/Profile";
import AddProduct from "../components/account/AddProduct";
import ManageProduct from "../components/account/ManageProduct";
import ShippingAddress from "../components/account/ShippingAddress";

const SelectCard = ({name, setSelect, hidden, setHidden}) => {
    if(setSelect) {
        return (
                <div className={styles.selectCard} onClick={() => setSelect(name)}>
                    <FontAwesomeIcon className={styles.icon} icon={faChevronDown} /> {name}
                </div>
        )

    } else {
        return (
            <div className={styles.selectCard} onClick={() => setHidden(!hidden)}>
                <FontAwesomeIcon className={styles.icon} icon={faChevronDown} /> {name}
            </div>
        )
    }
}

const MiniCard = ({name, setSelect}) => {
    return (
        <div className={styles.mini_card} onClick={() => setSelect(name)}>
            <FontAwesomeIcon className={styles.icon} icon={faChevronDown} /> {name}
        </div>
    )
}

function Account({children}) {
    const { state } = useStore()
    const [user, setUser] = useState({})
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()

    const [select, setSelect] = useState('');
    const [hidden, setHidden] = useState(true)

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
    }, [])

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
                        Array.isArray(user.options) && user.options.map((item) => {
                            if((typeof item === 'string' && item !== 'Product Management') || (item instanceof String && item !== 'Product Management')) {
                                return ( <SelectCard key={item} name={item} setSelect={setSelect} /> )
                            }
                        })
                    }

                    {
                        user.isAdmin === true && (
                        <>
                            <SelectCard className={styles.productMng} id="manage_product" name={'Product Management'} setHidden={setHidden} hidden={hidden} />
                            <div className={`${styles.popUp} hidden ${hidden ? '' : styles.show}`}>
                                {
                                    Array.isArray(user.options[2]) && user.options[2].map((item) => (
                                        <MiniCard key={item} name={item} setSelect={setSelect} />
                                    ))
                                }
                            </div>
                        </>
                        )
                    }
                </div>
            </div>

            <div className={styles.content}>
                {select === 'Profile' && <Profile user={user} />}
                {select === 'Add Product' && <AddProduct />}
                {select === 'Manage Product' && <ManageProduct />}
                {select === 'Shipping Address' && <ShippingAddress user={user} />}
                {children}
            </div>
        </div>
    );
}

export default Account;