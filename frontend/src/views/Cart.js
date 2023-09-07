import styles from './Cart.module.css'
import CartItem from '../components/cartItem/CartItem';
import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

function Cart() {
    const { state } = useStore()
    const [cart, setCart] = useState([])
    const [items, setItems] = useState([])
    const [totalProduct, setTotalProduct] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const axiosPrivate = useAxiosPrivate()

    function handleCheckAll(e) {
        const checkAll = document.getElementById('checkAll')
        const elems = document.getElementsByClassName('checkbox')
        if(e.target.checked === false) {
            for(let elem of elems) {
                elem.checked = checkAll.checked
            }
            setTotalProduct(0)
            setTotalAmount(0)
        } else {
            setTotalProduct(elems.length)
            let totalMoney = 0
            let totalItem = 0;
            for(let elem of elems) {
                elem.checked = checkAll.checked
                totalMoney += Number(elem.getAttribute('data-price')) * Number(elem.getAttribute('data-quantity'))
                totalItem += Number(elem.getAttribute('data-quantity'))
            }
            setTotalProduct(totalItem)
            setTotalAmount(totalMoney)
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
    
    useEffect(() => {
        const allProducts = Array.from(document.querySelectorAll('input[name="checkItem[]"]:checked'));
        let itemArray = []
        for(let item of allProducts) {
            const product = cart.find(cartItem => cartItem._id === item.id)
            const finalProduct = {
                name: product.name,
                size: product.size,
                color:  product.color,
                quantity: product.quantity,
                price: product.price,
                total: product.price * product.quantity,
                _id: item.id
            }
            itemArray.push(finalProduct)
        }
        setItems(itemArray)
    }, [totalProduct])

    return (
        <>
            {cart.length > 0 ? (
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
                        Array.isArray(cart) && cart.map((item, index) => {
                            return (
                            <CartItem state={state} key={`${item.product.
                                toString()}${index}`} item={item}
                                setTotalAmount={setTotalAmount}
                                setTotalProduct={setTotalProduct}
                                setItems={setItems}
                             /> )
                        })}
                    </tbody>
                    </table>
                    
                    <div className={`position-fixed bottom-0 ${styles.footer}`}>
                    <div className={styles.cart_footer}>
                        <div>
                            <p>Total products: <span>{totalProduct}</span></p>
                            <p>Total amount: <span>${totalAmount}</span></p>
                        </div>
                        <Link to='/order'
                        state={{
                            items: items,
                            email: state.userInfo.email,
                            totalAmount: totalAmount,
                            totalProduct: totalProduct
                        }}><button className={styles.purchase_btn}>Purchase</button></Link>
                        </div>
                    </div>
                </div>
            ) : 
                (<div className={styles.no_item}>
                    <p>The cart is empty!</p>
                </div>)
            }
        </>
    );
}

export default Cart;