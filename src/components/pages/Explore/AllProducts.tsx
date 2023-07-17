import AllProductsCard from './UI/AllProductsCard';
import useFetch from '../../hooks/useFetch'
import styles from './AllProducts.module.css'
import loadingIcon from "react-useanimations/lib/loading";
import UseAnimations from "react-useanimations";
import {Link} from 'react-router-dom'

const AllProducts = ({loading, products}) => {
  const {error} = useFetch();
  
  return (
    <div className={styles.body}>
        {loading && <div className={styles.loadingContainer}>
          <UseAnimations
        animation={loadingIcon}
        size={50}/>
          </div>}
        {error && <p>{error}</p>}
        {products && !loading && products.map((product) => 
              <li key={product.id}>
                <Link to={`/products/${product.id}/overview/`} className={styles.link}>
                  <AllProductsCard
                  name={product.name}
                  price={product.price}
                  src={product.category === 'Headphones' ? '/public/images/headphone.png' : '/public/images/headset.png'} 
                  rating={product.rating}
                  reviews={product.reviews.length} />
                </Link>
              </li>)}
    </div>
  )
}

export default AllProducts
