import { createContext } from 'react'
import { useReducer } from 'react'

const Store = createContext()

const initialState = {
    cart: [], 
    item: {},
    token: null
}

function reducer(state, action) {
    switch(action.type) {
        case 'ADD_ITEM': 
            let total = 0
            state.cart.map(item => {
                total += item.number
            })
            total += action.payload.number

            localStorage.setItem('cartItems', JSON
            .stringify(total))
            return {
                ...state, 
                cart: [...state.cart, action.payload]
            }

        case 'LOG_IN':
            const { accessToken } = action.payload
            return {
                ...state, 
                token: accessToken
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