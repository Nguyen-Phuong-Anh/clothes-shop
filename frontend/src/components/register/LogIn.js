import styles from './LogIn.module.css'
import Form from 'react-bootstrap/Form';

function LogIn() {
    return (
        <div className={styles.wrapper}>
            <h1>RAYNE</h1>
            <div className={styles.choice}>
                <button>LOGIN</button>
                <button>REGISTER</button>
            </div>

            <div className={styles.body}>
                <div className={styles.login}>
                    <div>
                        <div>
                            <Form.Label htmlFor='inputEmail'>Email address</Form.Label>
                            <Form.Control id='inputEmail' type="email" />
                        </div>
                        <div>
                            <Form.Label className='mt-3' htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
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
                        <button className={styles.sigIn_btn}>SIGN IN</button>
                    </div>
                    <div>
                        <p>Do not have account? <span><a href='/'>Register</a></span></p>
                    </div>
                </div>

                <div className={styles.register}>

                </div>
            </div>
        </div>
    );
}

export default LogIn;