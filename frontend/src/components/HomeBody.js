import DetailCard from './card/Card';
import { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function HomeBody() {
    const [products, setProducts] = useState([])
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axiosPrivate.get('/products')
                setProducts(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className='home_slider'><Slider/></div>
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
                    {Array.isArray(products) && products.map((product) => (
                        <DetailCard key={product._id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeBody;