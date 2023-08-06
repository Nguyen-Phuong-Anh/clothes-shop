import { createContext } from 'react'
import { useReducer } from 'react'

const Store = createContext()

const initialState = {
    cart: [], 
    cartItems: 0,
    item: {},

    userInfo: {
        email: '',
        token: null
    }
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
                userInfo: {
                    email: action.payload.email,
                    token: action.payload.token
                }
            }

        case 'LOG_OUT':
            return {
                ...state, 
                userInfo: {
                    ...state.userInfo,
                    token: null
                }
            }
        default:
    }
}

function CartStoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    )
}

export default CartStoreProvider
export { Store }