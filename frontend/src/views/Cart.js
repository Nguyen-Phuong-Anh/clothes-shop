import styles from './Cart.module.css'
import SnippetQuantity from '../components/SnippetQuantity';
import image3 from '../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
function Cart() {
    return (
        <div>
            <table className={styles.table}>
                <tr className={styles.header}>
                    <th>
                    <div className={styles.checkAll}>
                        <input id="checkAll" type="checkbox"/>
                        <label for="checkAll">Product</label>
                    </div>
                    </th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Option</th>
                </tr>

                <tr className={styles.wrapper}>
                    <td>
                        <div className={styles.item}>
                            <input type="checkbox" />
                            <div className={styles.itemBody}>
                                <img src={image3}/>
                                <p>fsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfj</p>
                            </div>
                            <div className={styles.itemInfo}>
                                <p>Item's type</p>
                                <p></p>
                            </div>
                        </div>
                    </td>
                    <td>price</td>
                    <td className={styles.center}><SnippetQuantity/></td>
                    <td>total</td>
                    <td>
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Cart;