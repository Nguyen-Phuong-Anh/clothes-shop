import styles from './ManageAccount.module.css'
import styles2 from '../invoice/InvoiceItem.module.css'
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import InvoiceItem from '../invoice/InvoiceItem';

function DetailOrder() {
    const location = useLocation();
    const value = location.state;
    const { id } = useParams()
    const [orderDetail, setOrderDetail] = useState([])
    const [shipAds, setShipAds] = useState({})

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        try {
            const getOrder = async () => {
                try {
                    await axiosPrivate.get(`/order/getDetailOrder/${id}`).then(res => {
                        setOrderDetail(res.data)
                    })
                } catch (error) {
                    console.error(error)
                }
            }
            getOrder();
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        try {
            const getAdrs = async () => {
                try {
                    await axiosPrivate.post('/order/getOrderAddr', {
                        userId: value.userId
                    }).then(res => {
                        setShipAds(res.data)
                    })
                } catch (error) {
                    console.error(error)
                }
            }
            
            getAdrs()
        } catch (error) {
            console.log(error)
        }
        
    }, [])

    return (
        <div>
            <div className={styles.header}>
                <div>
                    <h3>Customer: <span>{shipAds.fullName}</span></h3>
                    <p>Tel: {shipAds.tel}</p>
                    <p>City: {shipAds.city}</p>
                    <p>Address: {shipAds.address}</p>
                </div>
            </div>

            <div className={styles2.body1}>
                <div className={styles2.table}>
                    <div>
                        <div className={styles2.tb_header}>
                            <div>Product</div>
                            <div>Quantity</div>
                            <div>Price</div>
                            <div>Total</div>
                        </div>
                    </div>
                    {/* */}
                    <span className={styles2.box1}></span>
                    <div className={styles2.tb_body}>
                        <div className={`${styles2.over_scroll}`}>
                            {
                                Array.isArray(orderDetail.cart) && orderDetail.cart.map((item, index) => (
                                    <div key={`${index}OC2`} className={`${index % 2 === 0 ? styles.odd_color : ''}`}>
                                        <InvoiceItem key={`${item.id}${index}OC`} item={item} />   
                                    </div>              
                                ))
                            }  
                        </div>
                            
                    </div>

                    <div className={`d-flex justify-content-end align-items-center mt-4`}>
                        <div className={styles.total}>
                            <p>TOTAL <span>$ {orderDetail.totalAmount}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailOrder;