import styles from './CartItem.module.css'
import SnippetQuantity from '../SnippetQuantity'
import image3 from '../../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '../Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect } from 'react';

function CartItem({accessKey = '', state, item}) {
    const [number, setNumber] = useState(`${Number(item.quantity)}`)
    const [product, setProduct] = useState({})
    const [color, setColor] = useState(`${item.color}`)
    const [size, setSize] = useState(`${item.size}`)

    const axiosPrivate = useAxiosPrivate()

    const [rotate, setRotate] = useState(false)
    
    function handleCheck() {
        const checkAll = document.getElementById('checkAll')
        var isCheckedAll = document.querySelectorAll('input[name="checkItem[]"]:checked').length === document.querySelectorAll('input[name="checkItem[]"]').length
        checkAll.checked = isCheckedAll
    }

    const handleRotate = () => {
        setRotate(!rotate)
    }

    const handleDelete = async () => {
        try {
            await axiosPrivate.post('/cart/delete', {
                email: state.userInfo.email,
                accessKey: accessKey,
            }).then(res => console.log(res))
        } catch (error) {
            console.error(error)   
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axiosPrivate.get(`/products/${item.product}`)
                setProduct(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        getProduct()
    }, [])

    useEffect(() => {
        const updateProduct = async () => {
            const id = item.product.toString();
            try {
                const res = await axiosPrivate.post(`/cart/update`, {
                    email: state.userInfo.email,
                    accessKey: accessKey,
                    number: number,
                    color: color,
                    size: size
                })
                
            } catch (error) {
                console.error(error)
            }
        }

        updateProduct()
    }, [number, color, size])

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
                        <p>{`${item.type} - ${item.size} - ${item.color}`}</p>
                        {/* popUp custom */}
                        <div className={styles.popWrapper}>
                            <div className={`${styles.popUp} ${rotate ? styles.show : ''}`}>
                                <p>Color</p>
                                <div className={styles.button_group}>
                                    {Array.isArray(product.colors) && product.colors.map((item, index) => (
                                        <div onClick={() => setRotate(!rotate)}><Button setColor={setColor} key={index} color={item} /></div>
                                    ))}
                                </div>
                                <p>Size</p>
                                <div className={styles.button_group}>
                                    {Array.isArray(product.sizes) && product.sizes.map((item, index) => (
                                        <div><Button setSize={setSize} value={item} key={index} size={item} /></div>
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
                <div>
                    <button onClick={() => handleDelete()} className={styles.delete}>
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                    </button>
                </div>
            </td>
        </tr>
        </>
    );
}

export default CartItem;