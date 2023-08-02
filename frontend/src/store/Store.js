import { createContext } from 'react'
import { useReducer } from 'react'

const Store = createContext()

const initialState = {
    cart: [], 
    cartItems: 0,
    item: {},
    token: null
}

function reducer(state, action) {
    switch(action.type) {
        case 'ADD_ITEM':
            let total = state.cartItems + action.payload.number

            localStorage.setItem('cartItems', JSON
            .stringify(total))
            return {
                ...state, 
                cartItems: total,
                cart: [...state.cart, action.payload]
            }

        case 'LOG_IN':
            return {
                ...state, 
                token: action.payload
            }

        case 'LOG_OUT':
            return {
                ...state,
                token: null
            }
        default:
    }
}

function CartStoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Store.Provider value={[state, dispatch]}>
            {children}
        </Store.Provider>
    )
}

export default CartStoreProvider
export { Store }