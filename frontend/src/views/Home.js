// import axios from 'axios'
import NavBar from '../components/navbar/NavBar'
import { useState, useEffect } from 'react';
import ResponsiveNavBar from '../components/navbar/ResponsiveNavBar'

function Home({children}) {
    // const fetchData = async () => {
    //     const result = await axios.get('/accounts')
    //     console.log(result.data)
    // }
    // fetchData()
    const [width, setWidth] = useState(0)

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
    
    return (
        <div>
            {width >= 992 ? <NavBar/> : <ResponsiveNavBar/> }
            {children}
        </div>
    );
}

export default Home;