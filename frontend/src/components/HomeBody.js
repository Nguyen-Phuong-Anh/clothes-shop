import DetailCard from './card/Card';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Slider from '../components/Slider';

function HomeBody() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/products')
            setProducts(result.data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <Slider/>
            <div className='body'>
                <div>
                    <ul>
                        <li>jfalsf</li>
                        <li>jfalsf</li>
                        <li>jfalsf</li>
                        <li>jfalsfﾞ</li>
                    </ul>
                </div>
                <div className='card_group'>
                    {products.map((product) => (
                        <DetailCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeBody;