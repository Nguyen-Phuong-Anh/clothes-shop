import { createContext } from 'react'
import { useReducer } from 'react'

const cartContext = createContext()

const initialState = {
    cart: ['1'], 
    item: {}
}

function reducer(state, action) {
    switch(action.type) {

        default:
    }
}

function CartStore({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <cartContext.Provider value={[state, dispatch]}>
            {children}
        </cartContext.Provider>
    )
}

export default CartStore
export { cartContext }