import AllProductsCard from './UI/AllProductsCard';
import useFetch from '../../hooks/useFetch'
import styles from './AllProducts.module.css'
import UseAnimations from "react-useanimations";
import {Link} from 'react-router-dom'
import Loading from '../Loading/Loading';
import {useEffect, useState, useContext} from 'react'

const AllProducts = ({loading, products}) => {
  const {error} = useFetch();
  const [pageLoading, setPageLoading] = useState<boolean>()

  useEffect (()=> {
    setPageLoading(true); 

    setTimeout(() => {
      setPageLoading(false);
    }, 1500);    
  },[])

  return (
    <div className={styles.body}>
        {pageLoading && <Loading />}
        {loading  && <Loading />}
        {error && <p>{error}</p>}
        {products && !loading && products.map((product) => 
              <li key={product.id}>
                <Link to={`/products/${product.id}/overview/`} className={styles.link}>
                  <AllProductsCard
                  name={product.name}
                  price={product.price}
                  src={product.category === 'Headphones' ? 'src/assets/headphone.png' : 'src/assets/headset.png'} 
                  rating={product.rating}
                  reviews={product.reviews.length} />
                </Link>
              </li>)}
    </div>
  )
}

export default AllProducts
