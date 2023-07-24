import styles from './LogIn.module.css'
import Form from 'react-bootstrap/Form';

function SignIn() {
    return (
        <form method='post' action='/signin' className={styles.columnSignIn}>
            <div>
                <div>
                    <Form.Label htmlFor='user'>Email address</Form.Label>
                    <Form.Control className={`${styles.input} p-2`} id='user' type="email" />
                </div>
                <div>
                    <Form.Label className='mt-3' htmlFor="pwd">Password</Form.Label>
                    <Form.Control
                        className={`${styles.input} p-2`}
                        type="password"
                        id="pwd"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
            </div>
            <div>
                <a href='/'>Forgot password?</a>
            </div>
            <div>
                <button type='submit' className={styles.btn}>SIGN IN</button>
            </div>
            <div>
                <p>Do not have account? <span><a href='/'>Register</a></span></p>
            </div>
        </form>
    );
}

export default SignIn;