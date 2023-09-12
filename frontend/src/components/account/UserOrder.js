import styles from './ManageAccount.module.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({orderItem}) => {
    return (
        <Link to={`/order/${orderItem._id}`} state={orderItem} className='link'>
            <div className={styles.order_item}>
                <div className={styles.order_thumbnail}>R</div>
                <div className={styles.order_item_content}>
                    <p><span>Order</span> <span className={styles.order_id}>#{orderItem._id}</span></p>
                    <p>Total amount: ${orderItem.totalAmount}</p>
                    <p>State: {orderItem.status}</p>
                </div>
            </div>
        </Link>
    )
}

function UserOrder({ userId }) {
    const axiosPrivate = useAxiosPrivate();
    const [order, setOrder] = useState([])
    
    useEffect(() => {
        try {
            const getOrder = async () => {
                await axiosPrivate.post('/order/getOrder', {
                    userId
                }).then(res =>{ 
                    console.log(res.data)
                    setOrder(res.data)})
            }

            getOrder()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className={`${styles.wrapper} mt-2`}>
            <h1>My Order</h1>
            <div className={styles.section}>
                {
                    order.map((orderItem, index) => (
                        <OrderItem key={`${orderItem.id}${index} id`} orderItem={orderItem} />
                        )
                    )
                }
            </div>
        </div>
    );
}

export default UserOrder;