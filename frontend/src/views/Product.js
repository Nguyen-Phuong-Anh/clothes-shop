import image3 from '../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button';
import Slider from '../components/Slider'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { cartContext } from '../store/CartStore';
import axios from 'axios'

function Product() {
    const [number, setNumber] = useState(1)
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [dispatch] = useContext(cartContext)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/product/${id}`)
            setProduct(result.data)
        }
        fetchData()
    }, [])

    function handlePurchase() {
        const color = document.getElementsByClassName('check')
        const size = document.getElementsByClassName('border')
        console.log(color[0].value, size[0].value, number, product)
        const addedProduct = {
            id: product.id,
            category: product.category,
            name: product.name, 
            type: product.type, // shirts, sneakers...
            size: size[0].value,
            color: color[0].value,
            material: product.material,
        }
        dispatch({
            type: 'ADD_ITEM',
            payload: addedProduct
        })
    }

    return (
        <div className="product_container">
            <div className="product_image">
                <Slider image={image3}/>
            </div>
            <div className="product_content">
                <h2>{product.name}</h2>
                <div className='sell'>
                    <div className='star'>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div>{product.review} reviews</div>
                    <div>{product.sold} sold</div>
                </div>
                <div className='product_content_body'>
                    <h3 className='price'>{product.price}</h3>
                    <hr></hr>
                    <h5>Choose</h5>
                    <div className='color'>
                        <p>Color: </p>
                        <div className='color_group'>
                            {Array.isArray(product.colors) &&
                                product.colors.map((item) => {
                                return <Button key={item} color={item} />;
                            })}
                        </div>
                    </div>
                    <div>
                        <p>Size:</p>
                        <div className='color_group'>
                            {Array.isArray(product.sizes) &&
                                product.sizes.map((item) => {
                                return <Button key={item} size={item} />;
                            })}
                        </div>
                    </div>
                    <div className='snippet_container'>
                        <div className='snippet'>
                            <button
                            onClick={() => {
                                let val = number + 1
                                setNumber(val)
                            }}
                            >+</button>
                            <input 
                            value={number} 
                            type="text"
                            onChange={(event) => {setNumber(event.target.value)}}
                            />
                            <button
                            onClick={() => {
                                if(number > 0) {
                                    let val = number - 1
                                    setNumber(val)
                                }
                            }}
                            >-</button>
                        </div>
                        <button className='btn_purchase' onClick={handlePurchase}> <FontAwesomeIcon className='purchase_icon' icon={faBagShopping} 
                        />Add to the cart</button>
                    </div>
                    <hr></hr>
                    <div>
                        <h5>About this product</h5>
                        <i>{product.description}</i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;