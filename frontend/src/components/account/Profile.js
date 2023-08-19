import styles from './ManageAccount.module.css'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
        if(username === '' || email === '') {
            setUsername(user.username)
            setEmail(user.email)
        }
        if((id === e.target.dataset.value && hidden === false) || (id === '') || (hidden === true && id !== '')) {
            setId(e.target.dataset.value);
            setHidden(!hidden)            
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/account/update', {
                id: user.id,
                username: username,
                email: email,
                password: password
            }, { withCredentials: true })
            .then(res => {
                console.log(res)
                window.location.reload();
            })
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
        <form onSubmit={handleSubmit} className={`${styles.wrapper} mt-3`}>
            <h3>My Account</h3>
            <div className={styles.section}>
                <div className={styles.info}>
                    <label>Username</label>
                    <div className={styles.container}>
                        <p className={`${styles.show} ${hidden === true ? '' : id === 'username' ? styles.none : ''}`}>{username ? username : user.username}</p>
                        <input
                            className={`hidden ${hidden === true ? '' : id === 'username' ? styles.show : ''}`}
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
                        <p className={`${styles.show} ${hidden === true ? '' : id === 'email' ? styles.hidden : ''}`}>{email ? email : user.email}</p>
                        <input
                            className={`hidden ${hidden === true ? '' : id === 'email' ? styles.show : ''}`}
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
                        <p className={`${styles.show} ${hidden === true ? '' : id === 'password' ? styles.hidden : ''}`}>*****************</p>
                        <input
                            className={`hidden ${hidden === true ? '' : id === 'password' ? styles.show : ''}`}
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
                <Button type='submit' className={`${styles.btn_size}`} variant="outline-success">Save</Button>
                <Button className={`${styles.btn_size}`} onClick={handleCancel} variant="outline-secondary">Cancel</Button>
            </div>
        </form>
    );
}

export default Profile;