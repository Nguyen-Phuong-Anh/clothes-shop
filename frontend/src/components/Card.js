import styles from './Card.module.css'
import { Link } from 'react-router-dom'
function DetailCard({product}) {
  const image = require("../images/clothes3.jpg");
  
  return (
    <Link to="/product" className='link'>
      <div className={styles.wrapper}>
          <div className={styles.image}>
              <img src={image} alt='product' />
          </div>
          <div className={styles.content}>
              <p>{product.name}</p>
              <p className={styles.price}>{product.price}</p>
          </div>
      </div>
    </Link>
  );
}

export default DetailCard;