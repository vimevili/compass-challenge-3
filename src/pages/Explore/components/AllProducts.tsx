import AllProductsCard from './AllProductsCard';
import useFetch from '../../../hooks/useFetch'
import styles from './AllProducts.module.css'
import {Link} from 'react-router-dom'
import Loading from '../../../components/Loading/Loading';
import {useEffect, useState } from 'react'

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
        {products && !loading && products.map((product, index) => 
              <li key={index}>
                <Link to={`/products/${product.id}/overview/`} className={styles.link}>
                  <AllProductsCard
                  name={product.name}
                  price={product.price}
                  src={product.category === 'Headphones' ? '/src/assets/images/headphone.png' : '/src/assets/images/headset.png'} 
                  rating={product.rating}
                  reviews={product.reviews.length} />
                </Link>
              </li>)}
    </div>
  )
}

export default AllProducts
