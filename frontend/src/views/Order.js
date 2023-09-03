import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './Order.module.css'
import shippingStyles from '../components/account/ManageAccount.module.css'
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const OrderItem = ({item}) => {
    return (
        <tr className={styles.orderItem}>
            <td className={styles.orderItemBody}>
                <img />
                <div>
                    <h6>{item.name}</h6>
                    <p><span>Color:</span> {item.color}</p>
                    <p><span>Size:</span> {item.size}</p>
                </div>
            </td>
            <td>{item.price}</td>
            <td><span>Quantity:</span> {item.quantity}</td>
            <td>{item.quantity * item.price}</td>
        </tr>
    )
}

function Order() {
    const location = useLocation();
    const value = location.state;
    const [shippingAddress, setShippingAddress] = useState({})
    const axiosPrivate = useAxiosPrivate()

    const handleOrder = async () => {
        try {
            await axiosPrivate.post('/order/createOrder', {
                email: value.email,
                cart: value.items,
                totalAmount: value.totalAmount,
                totalProduct: value.totalProduct,
                status: 'Processing',
                paymentMethod: {
                    online: Boolean,
                    offline: Boolean
                }
            })
        } catch (error) {   
            console.error(error)
        }
    }

    const handleClick = () => {
        console.log("hello")
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                await axiosPrivate.post('/account/getAddress', {
                    email: value.email
                }).then(res => {
                    setShippingAddress(res.data.shippingAddress)
                })
            } catch (error) {
                console.error(error)
            }
        }

        getUser();
    }, []) 

    return (
        <div className={styles.wrapper}>
            <div className={styles.order}>
                <h4>Order</h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            value.items.map((item, index) => (
                                <OrderItem key={index} item={item} />
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className={styles.payment}>
                <h4>Payment</h4>
                <div>
                    <h5>Shipping Address</h5>
                <div className={shippingStyles.section}>
                    <div className={shippingStyles.info}>
                        <label htmlFor='fullname'>Fullname</label>
                        <div className={shippingStyles.container}>
                            <p>{shippingAddress.fullName}</p>
                        </div>
                    </div>

                    <div className={shippingStyles.info}>
                        <label htmlFor='tel'>Tel</label>
                        <div className={shippingStyles.container}>
                            <p>{shippingAddress.tel}</p>
                        </div>
                    </div>

                    <div className={shippingStyles.info}>
                        <label htmlFor='city'>City</label>
                        <div className={shippingStyles.container}>
                            <p>{shippingAddress.city}</p>
                        </div>
                    </div>
                    
                    <div className={`${shippingStyles.info} mb-4`}>
                        <label htmlFor='address'>Address</label>
                        <div className={shippingStyles.container}>
                            <p>{shippingAddress.address}</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div>
                    <h5>Payment Method</h5>
                    <div>
                        <button>Online</button>
                        <button 
                        onClick={handleClick}
                        >Offline</button>
                    </div>
                    <div className={styles.alert} role="alert">This payment method hasn't available yet!</div>
                </div>
            </div>
        </div>
    );
}

export default Order;