import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

function DetailCard({product}) {
  const image = require("../../images/shirt2.jpg");
  
  return (
    <Link to={`/products/${product._id}`} className='link'>
      <div className={styles.wrapper}>
          <div className={styles.image}>
              <img src={image} alt='product' />
          </div>
          <div className={styles.content}>
              <p>{product.name}</p>
              <p className={styles.price}>${product.price}</p>
          </div>

          <div className={styles.toggle_buy}>
            <button><FontAwesomeIcon className={styles.icon} icon={faBagShopping} />
              Add to cart</button>
          </div>
      </div>
    </Link>
  );
}

export default DetailCard;