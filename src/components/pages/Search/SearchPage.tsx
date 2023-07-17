import {useState} from 'react';
import styles from './SearchPage.module.css'
import ProductCard from './UI/ProductCard'
import useFetch from '../../hooks/useFetch'
import {Link} from 'react-router-dom'

const SearchPage = () => {
const [search, setSearch] = useState('');
const { data, loading, error} = useFetch();

const filteredProducts:[Product] = data && search.length > 0 ? data.filter((product) =>
product.name.toLowerCase().includes(search.toLowerCase())) : [];

const popularProducts = [
  {name:"Bluetooth Sports Headphones", id:3, price: 79.99, rating: 4, reviews: 2},
  {name:"Premium Over-Ear Headphones", id:5, price: 199.99, rating: 4, reviews: 2},
  {name:"Wireless On-Ear Headphones", id:7, price: 129.99, rating: 4, reviews: 2}
]

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <img src="/public/images/icon-chevron-left.svg" alt="" />
        <h2 className={styles.search}>Search</h2>
        <Link to='/cart'>
          <img src="/public/images/icon-shopping-cart.svg" alt="" />
        </Link>
      </div>

    {/* SEARCH BAR */}
      <div className={styles.inputs}>
        <img src="public/images/icon-search.svg" id='img-lock' alt="" />
        <input
          type="search"
          placeholder="Search headphone"
          value={search}
          onChange={({target}) => setSearch(target.value)}
        />
      </div>

      {search.length === 0 ? 
        <>
        <h2 className={styles.popular}>Popular product</h2>
        <ul className={styles.productContainer}>
          {popularProducts.map((product, index) => 
          <li key={index}>
            <Link to={`/products/${product.id}/overview/`} className={styles.link}>
              <ProductCard 
              key={index}
              name={product.name}
              reviews={product.reviews}
              rating={product.rating}
              price={product.price}/>
            </Link> 
          </li>)}
        </ul>
        </>
        :       
      filteredProducts.length > 0 &&
      <ul className={styles.productContainer}>
          {filteredProducts.map((product, index) =>  
          <li key={index}>
            <Link to={'/products/${product.id}/overview'}>
              <ProductCard 
              name={product.name}
              reviews={product.reviews.length}
              rating={product.rating}
              price={product.price}/>
            </Link>
          </li>)}
      </ul>
      }
    </div>
  )
}

export default SearchPage
