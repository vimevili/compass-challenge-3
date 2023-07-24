import {Link, useNavigate} from 'react-router-dom'
import returnIcon from '../../../assets/images/return.svg'
import styles from './SearchHeader.module.css'

const SearchHeder = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none'}}><img src={returnIcon} alt="" /></button>
        <h2 className={styles.search}>Search</h2>
        <Link to='/cart'>
          <img src="/src/assets/images/shopping-cart.svg" alt="" />
        </Link>
    </div>
  )
}

export default SearchHeder
