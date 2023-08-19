import styles from './ManageAccount.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import data from '../../api/data'
import { useState } from 'react';
import axios from 'axios'

function ShippingAddress({user}) {
    const [fullname, setFullname] = useState('')
    const [tel, setTel] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const handleSubmit = async () => {
        try {
            await axios.put('/account/update', {
                shippingAddress: {
                    id: user.id,
                    fullName: fullname,
                    tel: tel,
                    city: city,
                    address: address
                }
            }, { withCredentials: true })
            .then(res => {
                console.log(res)
                window.location.reload();
            })
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div className={`${styles.wrapper} mt-3`}>
            <h3>Shipping Address</h3>
            <Form className='mt-3'>
                <Form.Group className={`mb-4`}>
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control 
                    className='input'
                    type="text" 
                    placeholder="Enter your fullname"
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group className={`mb-4`}>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control 
                    className='input'
                    type="tel" 
                    placeholder="Enter your phone number" 
                    value={tel}
                    onChange={e => setTel(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group className={`mb-4`}>
                    <Form.Label>City</Form.Label>
                    <Form.Select 
                    className='input'
                    id="citySelector"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    >
                        <option disabled>Select your city</option>
                        {
                            data.city.map((item) => (
                                <option key={item.city} value={item.city}>{item.city}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className={`mb-4`}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                    className='input'
                    type="text"
                    placeholder="Enter your address" 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    />
                </Form.Group>

                <div className={`${styles.button_area} mb-3`}>
                    <Button className={`${styles.btn_size}`} onClick={handleSubmit} variant="outline-success">Save</Button>
                </div>
            </Form>
        </div>
    );
}

export default ShippingAddress;