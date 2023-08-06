import styles from './Cart.module.css'
import CartItem from '../components/cartItem/CartItem';
import data from '../data';

function Cart() {
    function handleCheckAll() {
        const checkAll = document.getElementById('checkAll')
        const elems = document.getElementsByClassName('checkbox')
        for(let elem of elems) {
            elem.checked = checkAll.checked
        }
    }

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
                    
                    data.Cart.map((item) => {
                        const product = data.Products.find(product => product.id === item.id)
                        return ( <CartItem key={item.id} item={item} product={product} /> )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Cart;