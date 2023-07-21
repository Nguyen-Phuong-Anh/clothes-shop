import styles from './LogIn.module.css'

function LogIn() {
    return (
        <div>
            <div className={styles.choice}>
                <button>LOGIN</button>
                <button>REGISTER</button>
            </div>

            <div className={styles.body}>
                <div className={styles.login}>

                </div>
                
                <div className={styles.register}>

                </div>
            </div>
        </div>
    );
}

export default LogIn;