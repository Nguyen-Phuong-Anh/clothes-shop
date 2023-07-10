// import axios from 'axios'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react';
import ResponsiveNavBar from '../components/ResponsiveNavBar';

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
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
            <div>fjalskf</div>
        </div>
    );
}

export default Home;