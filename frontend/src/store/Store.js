import { createContext, useState } from 'react'
import { useReducer } from 'react'

const Store = createContext()

const initialState = {
    cart: [], 
    cartItems: 0,

    userInfo: {
        email: '',
        token: null
    }
}

function reducer(state, action) {
    switch(action.type) {
        case 'ADD_ITEM':
            let total = state.cartItems + action.payload.quantity

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
                cart: [], 
                cartItems: 0,
                
                userInfo: {
                    email: '',
                    token: null
                }
            }

        case 'REFRESH_TOKEN':
            return {
                ...state, 
                userInfo: {
                    email: action.payload.email,
                    token: action.payload.token
                }
            }
        default:
    }
}

function CartStoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || true)
    return (
        <Store.Provider value={{ state, dispatch, persist, setPersist }}>
            {children}
        </Store.Provider>
    )
}

export default CartStoreProvider
export { Store }