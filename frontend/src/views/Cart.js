import styles from './Cart.module.css'
import CartItem from '../components/cartItem/CartItem';

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
                    
                </tbody>
            </table>
        </div>
    );
}

export default Cart;