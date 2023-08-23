import styles from './Cart.module.css'
import CartItem from '../components/cartItem/CartItem';
import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Cart() {
    const { state } = useStore()
    const [cart, setCart] = useState([])
    const axiosPrivate = useAxiosPrivate()
    
    function handleCheckAll() {
        const checkAll = document.getElementById('checkAll')
        const elems = document.getElementsByClassName('checkbox')
        for(let elem of elems) {
            elem.checked = checkAll.checked
        }
    }

    useEffect(() => {
        const getCart = async () => {
            try {
                const result = await axiosPrivate.post('/cart', {
                    email: state.userInfo.email,
                    token: state.userInfo.token
                })
                setCart(result.data)
            } catch (error) {   
                console.log(error)
            }
        }

        getCart();
    }, [])

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.header}>
                        <th>
                        <div className={styles.checkAll}>
                            <input
                            id="checkAll"
                            type="checkbox"
                            onClick={handleCheckAll}
                            />
                            <label htmlFor="checkAll"></label>
                            <p>Product</p>
                        </div>
                        </th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Option</th>
                    </tr>
                </thead>

                <tbody>
                    {
                    Array.isArray(cart) && cart.map((item) => {
                        return ( <CartItem state={state} accessKey={item._id} key={item.product.toString()} item={item} /> )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Cart;