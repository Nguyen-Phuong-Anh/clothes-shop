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
        <div className='home_body'>
            <div className='home_quotes'>
                <h2>To become fashionable...</h2>
                <p>
                    <i>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.</i>
                </p>
            </div>
            <div className='home_slider'><Slider/></div>
            <div className='body'>
                <h1>Choose your styles</h1>
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