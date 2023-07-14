import {useState } from 'react'
import styles from './MainProducts.module.css'
import Filters from './Filters'
import ShopCarousel from './Carousels/ShopCarousel'
import FeaturedCarousel from './Carousels/FeaturedCarousel'

const MainProducts = () => {
  const [filter, setFilter] = useState('Headphone')

  function handleFilter(value) {
    setFilter(value)
  }
  
  return (
    <>
    <div className={styles.productsContainer}>
      <Filters handleFilter={handleFilter}/>
      <ShopCarousel filter={filter} />
      <div className={styles.featureContainer}>
        <p>Featured Products</p>
        <a className={styles.seeButton}>Sell All</a>
      </div>
      <FeaturedCarousel />  
    </div>
    </>
  )
}

export default MainProducts
