import useStore from "../store/useStore";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import image3 from '../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button';
import Slider from '../components/Slider'
import SnippetQuantity from '../components/SnippetQuantity';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useRefreshToken from "../hooks/useRefreshToken";

function Product() {
    const { state, dispatch } = useStore()
    const axiosPrivate = useAxiosPrivate()
    const [number, setNumber] = useState(1)
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const refresh = useRefreshToken()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axiosPrivate.get(`/products/${id}`,
                { withCredentials: true })
                setProduct(result.data)
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }, [])

    function handlePurchase() {
        const color = document.getElementsByClassName('border1')
        const size = document.getElementsByClassName('border')
        if(!size[0] || !color[0]) {
            alert("Please select size and color of the product!")
        } else {
            const addedProduct = {
                name: product.name, 
                type: product.type, // shirts, sneakers...
                size: size[0].value,
                color: color[0].value,
                quantity: number,
                price: product.price,
                image: ' ',
                product: product.id
            };

            const refreshTk = async () => {
                try {
                    await refresh();
                } catch(err) {
                    console.log(err)
                }
            }

            refreshTk();
            
            const verifySigin = async () => {
                try {
                    const res = await axiosPrivate.post('/products/addCart', {
                        email: state.userInfo.email,
                        token: state.userInfo.token,
                        addedProduct: addedProduct
                    })
    
                    dispatch({
                        type: 'ADD_ITEM',
                        payload: addedProduct
                    })
                } catch(err) {
                    console.error(err)
                    navigate('/login', { state: { from: location }, replace: true})
                }
            }

            verifySigin()
        }
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
                        <SnippetQuantity number={number} setNumber={setNumber}/>
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