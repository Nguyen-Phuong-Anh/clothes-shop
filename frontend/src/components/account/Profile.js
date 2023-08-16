import styles from './ManageAccount.module.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function Profile({user}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState('')

    const [hidden, setHidden] = useState(true)

    const handleClick = (e) => {
        if((id === e.target.dataset.value && hidden === false) || (id === '') || (hidden === true && id !== '')) {
            setHidden(!hidden)
            setId(e.target.dataset.value);
            
        }
    }

    const handleSubmit = async () => {
        try {
            await axios.put('/account/update', {
                username: username,
                email: email,
                password: password
            }, { withCredentials: true })
            setId('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setUsername(user.username)
        setEmail(user.email)
        setPassword('')

        setHidden(true)
    }

    return (
        <form className={styles.wrapper}>
            <h3>My Account</h3>
            <div className={styles.section}>
                <div className={styles.info}>
                    <label>Username</label>
                    <div className={styles.container}>
                        <p className={`${hidden ? '' : id === 'username' ? styles.hidden : ''}`}>{user.username}</p>
                        <input
                            className={`hidden ${hidden ? '' : id === 'username' ? styles.show : ''}`}
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button type='button' data-value='username' onClick={handleClick}><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                </div>
                <div className={styles.info}>
                    <label>Email</label>
                    <div className={styles.container}>
                        <p className={`${hidden ? '' : id === 'email' ? styles.hidden : ''}`}>{user.email}</p>
                        <input
                            className={`hidden ${hidden ? '' : id === 'email' ? styles.show : ''}`}
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='button' data-value='email' onClick={handleClick}><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                </div>
                <div className={styles.info}>
                    <label>Password</label>
                    <div className={styles.container}>
                        <p className={`${hidden ? '' : id === 'password' ? styles.hidden : ''}`}>*****************</p>
                        <input
                            className={`hidden ${hidden ? '' : id === 'password' ? styles.show : ''}`}
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete=''
                        />
                    </div>
                    <button type='button' data-value='password' onClick={handleClick}><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                </div>
            </div>
            <div className={`${hidden === true ? styles.none : ''} ${styles.button_area}`}>
                <Button className={`${styles.btn_size}`} onClick={handleSubmit} variant="outline-success">Save</Button>
                <Button className={`${styles.btn_size}`} onClick={handleCancel} variant="outline-secondary">Cancel</Button>
            </div>
        </form>
    );
}

export default Profile;