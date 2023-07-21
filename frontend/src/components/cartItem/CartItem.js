import styles from './CartItem.module.css'
import SnippetQuantity from '../SnippetQuantity'
import image3 from '../../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CartItem() {
    const [number, setNumber] = useState(1)
    const [rotate, setRotate] = useState(false)
    
    function handleCheck() {
        const checkAll = document.getElementById('checkAll')
        var isCheckedAll = document.querySelectorAll('input[name="checkItem[]"]:checked').length === document.querySelectorAll('input[name="checkItem[]"]').length
        checkAll.checked = isCheckedAll
    }

    const handleRotate = () => {
        setRotate(!rotate)
    }

    return (
        <>
        <tr>
            <td>
                <div className={styles.item}>
                <div className={styles.checkBox_wrapper}>
                    <input 
                    className='checkbox' type="checkbox" 
                    id='checkItem[]'
                    name='checkItem[]'
                    onChange={handleCheck}
                    />
                        <label htmlFor="checkItem[]"></label>
                    </div>
                    <div className={styles.itemBody}>
                        <img src={image3} alt='item'/>
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
        </>
    );
}

export default CartItem;