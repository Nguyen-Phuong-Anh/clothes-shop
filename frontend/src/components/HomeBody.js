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
                <div className='body_sidebar'>
                    <h3>List</h3>
                    <h5>Clothes</h5>
                    <ul>
                        <li>fals</li>
                        <li>fals</li>
                        <li>fals</li>
                    </ul>
                    <h5>Shoes</h5>
                    <ul>
                        <li>fals</li>
                        <li>fals</li>
                        <li>fals</li>
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