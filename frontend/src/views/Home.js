// import axios from 'axios'
import NavBar from '../components/navbar/NavBar'
import { useState, useEffect } from 'react';
import ResponsiveNavBar from '../components/navbar/ResponsiveNavBar'
import Slider from '../components/Slider';
function Home() {
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
            {width >= 768 ? <NavBar/> : <ResponsiveNavBar/> }
            <div className='slider_container'><Slider/></div>
            <div>
                <div>
                    
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Home;