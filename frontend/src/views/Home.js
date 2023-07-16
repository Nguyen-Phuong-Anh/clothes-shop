import NavBar from '../components/navbar/NavBar'
import { useState, useEffect, useContext } from 'react';
import ResponsiveNavBar from '../components/navbar/ResponsiveNavBar'
import { cartContext } from '../store/CartStore';

function Home({children}) {
    const [width, setWidth] = useState(0)
    const [state, dispatch] = useContext(cartContext)

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
            {width >= 992 ? <NavBar itemLength={state.cart.length}/> : <ResponsiveNavBar itemLength={state.cart.length} /> }
            {children}
        </div>
    );
}

export default Home;