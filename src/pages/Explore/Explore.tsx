import useFetch from '../../hooks/useFetch';
import {useState} from 'react'
import styles from './Explore.module.css'
import FilterButton from './components/FilterButton'
import AllProducts from './components/AllProducts';
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSortBy, setSelectedSortBy] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState()
  const [loading, setLoading] = useState<boolean>(false)

  const {data} = useFetch();
  const navigate = useNavigate()

  function getComparator(selectedSortBy) {
    switch (selectedSortBy) {
      case 'Popularity':
        return (a, b) => +b.rating - +a.rating;
      case 'Newest':
        return (a, b) => new Date(b.created_at) - new Date(a.created_at);
      case 'Oldest':
        return (a, b) => new Date(a.created_at) - new Date(b.created_at);
      case 'High Price':
        return (a, b) => +(b.price.substring(1)) - +(a.price.substring(1));
      case 'Low Price':
        return (a, b) => +(a.price.substring(1)) - +(b.price.substring(1));
      case 'Review':
        return (a, b) => b.reviews.length - a.reviews.length;
      default:
        return null;
    }
  }
  const comparator = getComparator(selectedSortBy)
  
  // Apply filters
  const applyFiltersAndSort = () => {

    let dataFiltered = [...data];
    if (selectedCategory) {
      dataFiltered = dataFiltered.filter((product) => product.category === selectedCategory);
    } 
    
    if (!selectedCategory && selectedSortBy) {
      const comparator = getComparator(selectedSortBy);
      dataFiltered = dataFiltered.sort(comparator);
    }

    if (selectedCategory && selectedSortBy) {
      const comparator = getComparator(selectedSortBy);
      dataFiltered = dataFiltered.sort(comparator);
    }
    setFilteredProducts(dataFiltered);
  }
  

  return (
    <motion.div className={styles.body}
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}>

      <div className={styles.headerIcons}>
        <button onClick={() => navigate(-1)} className={styles.reset}>
          <img src="/src/assets/images/return.svg" alt="" />
        </button>
        <Link to='/cart'>
          <img src="/src/assets/images/shopping-cart.svg" alt="" />
        </Link>
      </div>

     <div className={styles.header}>
       <p className={styles.titulo}>Featured products</p>
       <h1 className={styles.subtitulo}>See all products</h1>

       <FilterButton 
          setSelectedCategory = {setSelectedCategory}
          selectedCategory={selectedCategory}
          selectedSortBy={selectedSortBy}
          setSelectedSortBy={setSelectedSortBy}
          applyFiltersAndSort={applyFiltersAndSort}
          setLoading={setLoading}/>
     </div>
     {!filteredProducts ? 
      <AllProducts products={data} loading={loading}/> 
      : <AllProducts products={filteredProducts} loading={loading}/>}


     </motion.div>
  )
}

export default Explore
