import styles from './LogIn.module.css'
import Form from 'react-bootstrap/Form';

function Register() {
    return (
        <form className={styles.columnRegister}>
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
        </form>
    );
}

export default Register;