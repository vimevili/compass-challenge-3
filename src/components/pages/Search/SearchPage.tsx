import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPage.module.css'
import ProductCard from './UI/ProductCard'
import useFetch from '../../hooks/useFetch'
import {Link} from 'react-router-dom'
import { motion} from 'framer-motion'
import returnIcon from '../../../../public/images/icon-chevron-left.svg'

const SearchPage = () => {
const [search, setSearch] = useState('');
const { data, loading, error} = useFetch();
const navigate = useNavigate();

const filteredProducts:[Product] = data && search.length > 0 ? data.filter((product) =>
product.name.toLowerCase().includes(search.toLowerCase())) : [];

const popularProducts = [
  {name:"Bluetooth Sports Headphones", id:3, price: 79.99, rating: 4, reviews: 2},
  {name:"Premium Over-Ear Headphones", id:5, price: 199.99, rating: 4, reviews: 2},
  {name:"Wireless On-Ear Headphones", id:7, price: 129.99, rating: 4, reviews: 2}
]

  return (
    <motion.div
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '-100%' }}
    transition={{ duration: 0.5 }}
    layout>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none'}}><img src={returnIcon} alt="" /></button>
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
    </motion.div>
  )
}

export default SearchPage
