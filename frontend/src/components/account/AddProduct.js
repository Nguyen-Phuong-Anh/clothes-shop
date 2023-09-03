import styles from './ManageAccount.module.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useReducer, useState } from 'react';

const initialState = {
    category: '',
    name: '',
    type: '',
    sizes: '',
    colors: '',
    material: '',
    description: '',
    countInStock: '',
    price: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                ...state, 
                category: action.payload
            }
        
        case 'SET_NAME':
            return {
                ...state, 
                name: action.payload
            }
        
        case 'SET_TYPE':
            return {
                ...state, 
                type: action.payload
            }
        
        case 'SET_SIZES[]':
            const sizes = document.querySelectorAll('input[name="SIZES[]"]:checked')
            const sizeArray = Array.from(sizes)
            const str = sizeArray.map(item => item.value).join(';');
            return {
                ...state, 
                sizes: str
            }
        
        case 'SET_COLORS':
            return {
                ...state, 
                colors: action.payload
            }
        
        case 'SET_MATERIAL':
            return {
                ...state, 
                material: action.payload
            }
        
        case 'SET_DESCRIPTION':
            return {
                ...state, 
                description: action.payload
            }
        
        case 'SET_COUNTINSTOCK':
            return {
                ...state, 
                countInStock: action.payload
            }
        
        
        case 'SET_PRICE':
            return {
                ...state, 
                price: action.payload
            }

        case 'SET_CANCEL':
            const sizesArray = document.querySelectorAll('input[name="SIZES[]"]:checked')
            sizesArray.forEach((item) => {
                item.checked = false
            })
            return {
                category: '',
                name: '',
                type: '',
                sizes: '',
                colors: '',
                material: '',
                description: '',
                countInStock: '',
                price: ''
            }

        default:
            return {
                ...state
            }
    }
}

function AddProduct() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [hidden, setHidden] = useState(true)
    const [target, setTarget] = useState('')

    const axiosPrivate = useAxiosPrivate()

    const handleChange = (event) => {
        const {name, value} = event.target

        if(name === 'COLORS') {
            const regex = /^#[0-9A-Fa-f]{6};$/;
            const words = value.split(' ')
            const isValid = words.map(item => regex.test(item.trim())).find(item => item === false)
            setTarget('color')
            if(isValid === false) {
                setHidden(false)
            } else {
                if(hidden === false) setHidden(true)
            }
        } else if(name === 'COUNTINSTOCK' || name === 'PRICE') {
            if(name === 'COUNTINSTOCK') {
                setTarget('count')
            } else {
                setTarget('price')
            }
            const regex = /^\d+$/;
            if(!(regex.test(value) && value.length <= 6)) {
                setHidden(false)
            } else {
                if(hidden === false) setHidden(true)
            }
        }
        dispatch({
            type: "SET_" + name, payload: value
        })
    }

    const handleCancel = () => {
        dispatch({
            type: 'SET_CANCEL'
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosPrivate.post('/account/addProduct', state)
            .then(res => console.log(res))
            window.location.reload(); 
        } catch (error) {  
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.wrapper} mt-3`}>
            <h3>Add Product</h3>
            <div>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                        className={styles.selectGroup}
                        name='CATEGORY'
                        value={state.category}
                        onChange={handleChange}
                    >
                        <option disabled>Choose the category</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Shoes">Shoes</option>
                    </Form.Select>
                </Form.Group>

                <div className={`${styles.info} mt-3 ${styles.container}`}>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='NAME'
                        value={state.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={`${styles.info} mt-3 ${styles.container}`}>
                    <label htmlFor='type'>Type</label>
                    <input
                        type='text'
                        id='type'
                        name='TYPE'
                        value={state.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={`mt-4 pb-3 ${styles.check_wrapper} ${styles.info}`}>
                    Size
                    <div className={styles.checkAll}>
                        <input
                            type="checkbox"
                            name='SIZES[]'
                            onChange={handleChange}
                            value='S'
                        />
                        <label></label>
                        <p>S</p>
                    </div> 
                    <div className={styles.checkAll}>
                        <input
                            type="checkbox"
                            name='SIZES[]'
                            onChange={handleChange}
                            value='M'
                        />
                        <label></label>
                        <p>M</p>
                    </div> 
                    <div className={styles.checkAll}>
                        <input
                            type="checkbox"
                            name='SIZES[]'
                            onChange={handleChange}
                            value='L'
                        />
                        <label></label>
                        <p>L</p>
                    </div> 
                    <div className={styles.checkAll}>
                        <input
                            type="checkbox"
                            name='SIZES[]'
                            onChange={handleChange}
                            value='XL'
                        />
                        <label></label>
                        <p>XL</p>
                    </div> 
                </div>

                <div className={styles.warning_wrapper}>
                    <div className={`${styles.info} mt-3 ${styles.container}`}>
                        <label htmlFor='colors'>Colors</label>
                        <input
                            type='text'
                            id='colors'
                            name='COLORS'
                            value={state.colors}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={`${(hidden === false && target === 'color') ? styles.alert : styles.none}`} role="alert">Invalid form: The colors should be a string that contains hex color codes and each code is separated by a space ' '</div>
                </div>

                <div className={`${styles.info} mt-3 ${styles.container}`}>
                    <label htmlFor='material'>Material</label>
                    <input
                        type='text'
                        id='material'
                        name='MATERIAL'
                        onChange={handleChange}
                        required
                        value={state.material}
                    />
                </div>
                <div className={`${styles.info} mt-3 ${styles.container}`}>
                    <label htmlFor='type'>Description</label>
                    <textarea 
                        className='mb-3'
                        onChange={handleChange}
                        name='DESCRIPTION'
                        value={state.description}
                        required
                    >
                    </textarea>
                </div>
                <div className={styles.warning_wrapper}>
                    <div className={`${styles.info} mt-3 ${styles.container}`}>
                        <label htmlFor='type'>Count in Stock</label>
                        <input
                            type='text'
                            id='count'
                            name='COUNTINSTOCK'
                            onChange={handleChange}
                            required
                            value={state.countInStock}
                        />
                    </div>
                    <div className={`${(hidden === false && target === 'count') ? styles.alert : styles.none}`} role="alert">Invalid form: The count in stock should be a number</div>
                </div>
                <div className={styles.warning_wrapper}>
                    <div className={`${styles.info} mt-3 ${styles.container}`}>
                        <label htmlFor='type'>Price</label>
                        <input
                            type='text'
                            id='price'
                            name='PRICE'
                            onChange={handleChange}
                            required
                            value={state.price}
                        />
                    </div>
                    <div className={`${(hidden === false && target === 'price') ? styles.alert : styles.none}`} role="alert">Invalid form: The price should be a number</div>
                </div>
            </div>
            <div className={styles.button_area}>
                <Button type='submit' className={`${styles.btn_size}`} 
                variant="outline-success">Save</Button>
                <Button className={`${styles.btn_size}`} 
                onClick={handleCancel}  variant="outline-secondary">Cancel</Button>
            </div>
        </form>
    );
}

export default AddProduct;