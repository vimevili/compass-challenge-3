import useFetch from '../../hooks/useFetch';
import {useState} from 'react'
import styles from './Explore.module.css'
import FilterButton from './components/FilterButton'
import AllProducts from './components/AllProducts';
import {Link, useNavigate} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSortBy, setSelectedSortBy] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>()
  const [loading, setLoading] = useState<boolean>(false)

  type Product = {
    rating: number;
    price: string;
    name: string;
    description: string;
    category: string;
    created_at: Date;
    reviews: {
      user: string;
      description: string;
      rating: number;
      date: Date;
      id: number;
    }[];
    id: number;
  }
  const {data} = useFetch();
  const navigate = useNavigate()

  function getComparator(selectedSortBy: string) {   

    switch (selectedSortBy) {
      case 'Popularity':
        return (a: Product, b: Product) => +b.rating - +a.rating;
      case 'Newest':
        return (a: Product, b: Product) => new Date(b.created_at).getDate() - new Date(a.created_at).getDate();
      case 'Oldest':
        return (a: Product, b: Product) => new Date(a.created_at).getDate() - new Date(b.created_at).getDate();
      case 'High Price':
        return (a: Product, b: Product) => +(b.price.substring(1)) - +(a.price.substring(1));
      case 'Low Price':
        return (a: Product, b: Product) => +(a.price.substring(1)) - +(b.price.substring(1));
      case 'Review':
        return (a: Product, b: Product) => b.reviews.length - a.reviews.length;
      default:
        return null;
    }
  }

  // Apply filters
  const applyFiltersAndSort = (): void =>  {

    let dataFiltered
    if(data) dataFiltered = [...data];

    if (selectedCategory && dataFiltered) {
      dataFiltered = dataFiltered.filter((product) => product.category === selectedCategory);
    } 
    
    if (!selectedCategory && selectedSortBy && dataFiltered) {
      const comparator = getComparator(selectedSortBy);
      if(comparator) dataFiltered = dataFiltered.sort(comparator);
    }

    if (selectedCategory && selectedSortBy && dataFiltered) {
      const comparator = getComparator(selectedSortBy);
      if(comparator) dataFiltered = dataFiltered.sort(comparator);
    }
    setFilteredProducts(dataFiltered);
  }
  
  return (
    <AnimatePresence>
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
      {!filteredProducts && data && <AllProducts products={data} loading={loading}/>}
      { filteredProducts && <AllProducts products={filteredProducts} loading={loading}/>}


      </motion.div>
    </AnimatePresence>
  )
}

export default Explore
