import {useState} from 'react';
import styles from './SearchPage.module.css'
import SearchBar from './SearchBar'
import ProductCard from './UI/ProductCard'

const SearchPage = () => {

const [filteredProducts, setFilteredProducts] = useState();
const [search, setSearch] = useState('');

function handleSearch(products) {
  setFilteredProducts(products);
}

const popularProducts = [
  {name: 'TMA-2 Comfort Wireless', review: 3, rating: 4.6, price: 270},
  {name: 'TMA-2 DJ', review: 4, rating: 4.6, price: 270},
  {name: 'TMA-2 Move Wireless', review: 6, rating: 4.6, price: 270},
]
console.log(filteredProducts) 
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <img src="/public/images/icon-chevron-left.svg" alt="" />
        <h2 className={styles.search}>Search</h2>
        <img src="/public/images/icon-shopping-cart.svg" alt="" />
      </div>
      <SearchBar 
      handleSearch={handleSearch}/>
      {search === '' &&
      <>
        <h2 className={styles.popular}>Popular product</h2>
        <ul className={styles.productContainer}>
          {popularProducts.map((product, index) =>  
          <ProductCard 
          key={index}
          name={product.name}
          reviews={product.review}
          rating={product.rating}
          price={product.price}/>)}
        </ul>
      </>      
      }
      {      
      filteredProducts &&
      <ul className={styles.productContainer}>
          {filteredProducts.map((product, index) =>  
          <ProductCard 
          key={index}
          name={product.name}
          reviews={product.reviews.length}
          rating={product.rating}
          price={product.price}/>)}
      </ul>
      }
    </div>
  )
}

export default SearchPage
