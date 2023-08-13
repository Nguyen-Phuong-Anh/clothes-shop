import styles from './LogIn.module.css'
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import useStore from '../../store/useStore';

function SignIn() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')

    const { dispatch } = useStore()
    
    const emailRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {   
            await axios.post("http://localhost:3500/signin", JSON.stringify({
                user: user, 
                pwd: pwd
            }), {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }).then(res => {
                const { user, accessToken } = res.data
                if(res.status === 201) {
                    dispatch({
                        type: 'LOG_IN',
                        payload: {
                            email: user,
                            token: accessToken
                        }
                    })
                }
                setUser('')
                setPwd('')
                navigate(from, { replace: true })
            })
        } catch(err) {
            alert("Invalid email or password!")
            console.error(err)
            emailRef.current.focus()
        }
    }

    useEffect(() => {
        emailRef.current.focus()
    }, [])

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
                    ref={emailRef}
                    onChange={e => setUser(e.target.value)}
                    autoComplete=''
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
                        autoComplete=''
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