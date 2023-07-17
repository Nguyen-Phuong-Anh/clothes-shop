import { createContext } from 'react'
import { useReducer } from 'react'

const cartContext = createContext()

const initialState = {
    cart: [], 
    item: {}
}

function reducer(state, action) {
    switch(action.type) {
        case 'ADD_ITEM': 
            return {
                ...state, 
                cart: [...state.cart, action.payload]
            }
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