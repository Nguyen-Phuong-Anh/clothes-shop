import styles from './LogIn.module.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function LogIn() {
    const [hideLogIn, setHideLogIn] = useState(false)
    const [hideRegister, setHideRegister] = useState(true)

    const handleLogIn = () => {
        if(hideLogIn == true) {
            setHideLogIn(false)
            setHideRegister(true)
        }
    }

    const handleRegister = () => {
        if(hideRegister == true) {
            setHideLogIn(true)
            setHideRegister(false)
        }
    }

    return (
        <div className={styles.wrapper}>
            <h1>RAYNE</h1>
            <div className={styles.choice}>
                <button onClick={handleLogIn}>LOGIN</button>
                <button onClick={handleRegister}>REGISTER</button>
            </div>

            <div className={styles.body}>
                <div className={`${styles.login} ${hideLogIn ? styles.show : ''}`}>
                    <div>
                        <div>
                            <Form.Label htmlFor='inputEmail'>Email address</Form.Label>
                            <Form.Control className={`${styles.input} p-2`} id='inputEmail' type="email" />
                        </div>
                        <div>
                            <Form.Label className='mt-3' htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
                                className={`${styles.input} p-2`}
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                            />
                        </div>
                    </div>
                    <div>
                        <a href='/'>Forgot password?</a>
                    </div>
                    <div>
                        <button className={styles.btn}>SIGN IN</button>
                    </div>
                    <div>
                        <p>Do not have account? <span><a href='/'>Register</a></span></p>
                    </div>
                </div>

                <div className={`${styles.register} ${hideRegister ? styles.show : ''}`}>
                    <div>
                        <Form.Control className={`${styles.input} p-2`} placeholder='Name' />
                    </div>

                    <div>
                        <Form.Control className={`${styles.input} p-2`} placeholder='Username' />
                    </div>

                    <div>
                        <Form.Control className={`${styles.input} p-2`} type="email" placeholder='Email' />
                    </div>
                    
                    <div>
                        <Form.Control
                            className={`${styles.input} p-2`}
                            type="password"
                            aria-describedby="passwordHelpBlock"
                            placeholder='Password'
                        />
                    </div>
                    <div>
                        <Form.Control
                            className={`${styles.input} p-2`}
                            type="password"
                            aria-describedby="passwordHelpBlock"
                            placeholder='Repeat password'
                        />
                    </div>
                    <div className={styles.term}>
                        <input type="checkbox" id='checkTerm'
                        />
                        <label htmlFor='checkTerm'></label>
                        <p>I have read and agree to the terms</p>
                    </div>
                    <div>
                        <button className={styles.btn}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;