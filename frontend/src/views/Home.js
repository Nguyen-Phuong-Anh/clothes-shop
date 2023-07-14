import axios from 'axios'
import NavBar from '../components/navbar/NavBar'
import { useState, useEffect } from 'react';
import ResponsiveNavBar from '../components/navbar/ResponsiveNavBar'

function Home({children}) {
    const [width, setWidth] = useState(0)
    const [products, setProducts] = useState([])

    useEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', updateSize)
        updateSize()

        return () => {
            window.removeEventListener('resize', updateSize)
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/products')
            setProducts(result.data)
        }
        fetchData()
    }, [])
    
    return (
        <div>
            {width >= 992 ? <NavBar/> : <ResponsiveNavBar/> }
            {children}
        </div>
    );
}

export default Home;