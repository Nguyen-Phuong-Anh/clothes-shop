import styles from './CartItem.module.css'
import SnippetQuantity from '../SnippetQuantity'
import image3 from '../../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '../Button';

function CartItem({item, product}) {
    const [number, setNumber] = useState(`${Number(item.number)}`)
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
                    id={`item${item.id}`}
                    name='checkItem[]'
                    onChange={handleCheck}
                    />
                        <label htmlFor={`item${item.id}`}></label>
                    </div>
                    <div className={styles.itemBody}>
                        <img src={image3} alt='item'/>
                        <p>{item.name}</p>
                    </div>
                    <div className={styles.itemInfo}>
                        <p id='type' className={`${styles.type} ${rotate ? styles.rotate : ''}`} onClick={handleRotate}>Item's type</p>
                        <p>{`${item.category} - ${item.size} - ${item.color}`}</p>
                        
                        <div className={styles.popWrapper}>
                            <div className={`${styles.popUp} ${rotate ? styles.show : ''}`}>
                                <p>Color</p>
                                <div className={styles.button_group}>
                                    {product.colors.map(item => (
                                        <div><Button color={item} /></div>
                                    ))}
                                </div>
                                <p>Size</p>
                                <div className={styles.button_group}>
                                    {product.sizes.map(item => (
                                        <div><Button size={item} /></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            
            <td className={styles.num}>{product.price}</td>
            
            <td className={styles.center}><SnippetQuantity number={number} setNumber={setNumber}/></td>
            
            <td className={styles.num}>{number * product.price}</td>

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