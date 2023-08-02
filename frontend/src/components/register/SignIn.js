import styles from './LogIn.module.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useContext } from 'react';
import { Store } from '../../store/Store';

function SignIn() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [state, dispatch] = useContext(Store)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {   
            await axios.post("/signin", {
                user: user, 
                pwd: pwd
            }).then(res => {
                if(res.status === 201) {
                    dispatch({
                        type: 'LOG_IN',
                        payload: res.data
                    })
                }
                navigate('/')
            })
        } catch(err) {
            alert("Invalid email or password!")
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.columnSignIn}>
            <div>
                <div>
                    <Form.Label htmlFor='user'>Email address</Form.Label>
                    <Form.Control 
                    value={user} 
                    className={`${styles.input} p-2`} 
                    id='user' 
                    type="email"
                    onChange={e => setUser(e.target.value)}
                    />
                </div>
                <div>
                    <Form.Label className='mt-3' htmlFor="pwd">Password</Form.Label>
                    <Form.Control
                        value={pwd}
                        className={`${styles.input} p-2`}
                        type="password"
                        id="pwd"
                        aria-describedby="passwordHelpBlock"
                        onChange={e => setPwd(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <a href='/'>Forgot password?</a>
            </div>
            <div>
                <button type='submit' className={styles.btn}>SIGN IN</button>
            </div>
            
        </form>
    );
}

export default SignIn;