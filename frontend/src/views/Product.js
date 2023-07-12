import image3 from '../images/clothes3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import ColorButton from '../components/ColorButton';
import { useState } from 'react';
import Slider from '../components/Slider'
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Product() {
    const [number, setNumber] = useState(1)

    return (
        <div className="product_container">
            <div className="product_image">
                <Slider image={image3}/>
            </div>
            <div className="product_content">
                <h2>The greatest shirt in this world</h2>
                <div className='sell'>
                    <div className='star'>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div>127 reviews</div>
                    <div>1287 sold</div>
                </div>
                <div className='product_content_body'>
                    <h3 className='price'>12000</h3>
                    <hr></hr>
                    <h5>Choose</h5>
                    <div className='color'>
                        <p>Color: </p>
                        <div className='color_group'>
                            <ColorButton />
                            <ColorButton />
                            <ColorButton />
                        </div>
                    </div>
                    <div>
                        <p>Size:</p>
                        <div className='color_group'>
                            <ColorButton />
                            <ColorButton />
                            <ColorButton />
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
                        <button className='btn_purchase'> <FontAwesomeIcon className='purchase_icon' icon={faBagShopping} />Add to the cart</button>
                    </div>
                    <hr></hr>
                    <div>
                        <h5>About this product</h5>
                        <i>description</i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;