import styles from './Card.module.css'
import { Link } from 'react-router-dom'
function DetailCard({image}) {
  return (
    <Link to="/product" className='link'>
      <div className={styles.wrapper}>
          <div className={styles.image}>
              <img src={image} alt='product' />
          </div>
          <div className={styles.content}>
              <p>hjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</p>
              <p className={styles.price}>12.000</p>
          </div>
      </div>
    </Link>
  );
}

export default DetailCard;