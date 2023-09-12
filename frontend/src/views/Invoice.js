import styles from './Invoice.module.css'
import { useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const InvoiceItem = ({item}) => {
    return (
        <div className={`${styles.item_wrapper}`}>
            <div>
                    <p>{item.name}</p>
                    <p>{item.size} - {item.color}</p>
            </div>
            <div>
                <p>{item.quantity}</p>
            </div>
            <div>$ {item.price}</div>
            <div>$ {item.total}</div>
        
        </div>
    )
}

function Invoice() {
    const location = useLocation();
    const value = location.state;
    const { state } = useStore()

    const axiosPrivate = useAxiosPrivate()
    const [shipAds, setShipAds] = useState({})

    useEffect(() => {
        const getAds = async () => {
            try {
                await axiosPrivate.post('/account/getAddress', {
                    email: state.userInfo.email
                }).then(res => {
                    setShipAds(res.data.shippingAddress)
                })
            } catch (error) {
                console.error(error)
            }
        }

        getAds();
    }, []) 

    return (
        <div className={styles.wrapper}>
            <div className={styles.deco}></div>
            <div className={styles.header}>
                <div>
                    <h3>Billing to: <span>{shipAds.fullName}</span></h3>
                    <p>Tel: {shipAds.tel}</p>
                    <p>City: {shipAds.city}</p>
                    <p>Address: {shipAds.address}</p>
                </div>
                <div className={styles.title}>
                    <h1>Invoice</h1>
                    <h3>#{value._id}</h3>
                </div>
            </div>
            <div className={styles.body1}>
                <div className={styles.table}>
                    <div>
                        <div className={styles.tb_header}>
                            <div>Product</div>
                            <div>Quantity</div>
                            <div>Price</div>
                            <div>Total</div>
                        </div>
                    </div>
                    {/* */}
                    <span className={styles.box1}></span>
                    <div className={styles.tb_body}>
                        <div className={`${styles.over_scroll}`}>
                            {
                                Array.isArray(value.cart) && value.cart.map((item, index) => (
                                    <div key={`${index}WFS`} className={`${index % 2 === 0 && styles.odd_color}`}>
                                        <InvoiceItem key={`${item.id}${index}K`} item={item} index={index} />   
                                    </div>              
                                ))
                            }  
                        </div>
                            
                    </div>
                </div>
            </div>
            
            <div className={styles.body2_wrapper}>
                <div className={styles.side_note}>
                    <h5>Notes</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.</p>
                    <h5>Terms and conditinons</h5>
                    <p>Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna</p>
                </div>
                <div className={styles.body2}>
                    {/* status and payment */}
                    <div className={styles.body2_part1}>
                        <div>
                            <p>Payment method</p>
                            <p>Offline</p>
                        </div>
                        <div>
                            <p>Total product</p>
                            <p>{value.totalProduct}</p>
                        </div>
                    </div>
                    {/* total */}
                    <span className={styles.box2}></span>
                    <div className={styles.total}>
                        <p>TOTAL</p>
                        <p>$ {value.totalAmount}</p>
                    </div>
                </div>
            </div>
            <div className={styles.deco}></div>
        </div>
    );
}

export default Invoice;