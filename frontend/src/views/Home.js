import NavBar from '../components/navbar/NavBar'
import { useState, useEffect, useContext } from 'react';
import ResponsiveNavBar from '../components/navbar/ResponsiveNavBar'
import { Store } from '../store/Store';

function Home({children}) {
    const [width, setWidth] = useState(0)
    const [state] = useContext(Store)
    
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

    const handleItem = () => {
        let total = 0
        state.cart.map(item => {
            total += item.number
        })
        return total
    }
    
    return (
        <div>
            {width >= 992 ? <NavBar itemLength={localStorage.getItem("cartItems")}/> : <ResponsiveNavBar itemLength={localStorage.getItem("cartItems")} /> }
            {children}
        </div>
    );
}

export default Home;