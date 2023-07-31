import { createContext } from 'react'
import { useReducer } from 'react'

const Store = createContext()

const initialState = {
    cart: [], 
    item: {},
    userInfo: {}
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

        case 'LOGIN':
            return {
                ...state, 
                userInfo: action.payload
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