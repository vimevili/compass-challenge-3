import {useState } from 'react';
import styles from './SearchPage.module.css'
import ProductCard from './components/ProductCard'
import useFetch from '../../hooks/useFetch'
import {Link} from 'react-router-dom'
import { motion} from 'framer-motion'
import SearchInput from './components/SearchInput';
import SearchHeader from './components/SearchHeader';
import { Product } from '../../contexts/CartContext';

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');
  const {data} = useFetch();

const filteredProducts: Product[] = data && search.length > 0 ? data.filter((product) =>
product.name.toLowerCase().includes(search.toLowerCase())) : [];

const popularProducts = [
  {name:"Bluetooth Sports Headphones", id:3, price: 79.99, rating: 4, reviews: 2},
  {name:"Premium Over-Ear Headphones", id:5, price: 199.99, rating: 4, reviews: 2},
  {name:"Wireless On-Ear Headphones", id:7, price: 129.99, rating: 4, reviews: 2}
]

  return (
    <motion.div initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div className={styles.pageContainer}>

        <SearchHeader />

        <SearchInput search={search} setSearch={setSearch} />

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
                price={product.price}
                category='Headphones'/>
              </Link>
            </li>)}
          </ul>
          </>
          :
        filteredProducts.length > 0 &&
        <ul className={styles.productContainer}>
            {filteredProducts.map((product, index) =>
            <li key={index}>
              <Link to={'/products/${product.id}/overview'} className={styles.link}>
                <ProductCard
                name={product.name}
                reviews={product.reviews.length}
                rating={product.rating}
                price={product.price}
                category={product.category}/>
              </Link>
            </li>)}
        </ul>
        }
      </div>
    </motion.div>
  )
}

export default SearchPage