import styles from './Cart.module.css'
import SnippetQuantity from '../components/SnippetQuantity';
import image3 from '../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '../components/Button';

function Cart() {
    const [number, setNumber] = useState(1)
    const [rotate, setRotate] = useState(false)

    const handleRotate = () => {
        setRotate(!rotate)
    }

    function handleCheck() {
        const elems = document.getElementsByClassName('checkbox')
        for(let elem of elems) {
            elem.checked = !(elem.checked)
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
                            onClick={handleCheck}
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
                    <tr className={styles.wrapper}>
                        <td>
                            <div className={styles.item}>
                            <div className={styles.checkBox_wrapper}>
                                <input className='checkbox' type="checkbox" id='checkItem' />
                                    <label htmlFor="checkItem"></label>
                                </div>
                                <div className={styles.itemBody}>
                                    <img src={image3}/>
                                    <p>fsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfjfsfj</p>
                                </div>
                                <div className={styles.itemInfo}>
                                    <p id='type' className={`${styles.type} ${rotate ? styles.rotate : ''}`} onClick={handleRotate}>Item's type</p>
                                    <p>collar shirt - m - red</p>
                                    <div className={`${styles.popUp} ${rotate ? styles.show : ''}`}>
                                        <p>Color</p>
                                        <p>Size</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>price</td>
                        <td className={styles.center}><SnippetQuantity number={number} setNumber={setNumber}/></td>
                        <td>total</td>
                        <td>
                            <div className={styles.delete}>
                                <FontAwesomeIcon icon={faTrashCan} /> Delete
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Cart;