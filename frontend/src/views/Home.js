// import axios from 'axios'
import NavBar from '../components/navbar/NavBar'
import { useState, useEffect } from 'react';
import ResponsiveNavBar from '../components/navbar/ResponsiveNavBar'
import Slider from '../components/Slider';
import DetailCard from '../components/Card';
import image3 from '../images/clothes3.jpg'

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
            {width >= 992 ? <NavBar/> : <ResponsiveNavBar/> }
            <div className='slider_container'><Slider/></div>
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
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                </div>
            </div>
        </div>
    );
}

export default Home;