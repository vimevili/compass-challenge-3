import useFetch from '../../hooks/useFetch';
import {useState} from 'react'
import styles from './Explore.module.css'
import FilterButton from './Filters/FilterButton'
import AllProducts from './AllProducts';
import {Link, useNavigate} from 'react-router-dom'

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState(null);
  const {data} = useFetch();
  const [filteredProducts, setFilteredProducts] = useState()
  const [loading, setLoading] = useState(false)
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
  
  const applyFiltersAndSort = () => {

    // Apply filters
    if (selectedCategory) {
      setFilteredProducts(data && data.filter((product) => product.category === selectedCategory));
    } 

    let dataFiltered;
    switch (selectedSortBy) {
      case 'Popularity':
          dataFiltered = !selectedCategory ? data.sort(comparator) : filteredProducts.sort(comparator);
          
          break;
          case 'Newest':
            dataFiltered = !selectedCategory ? data.sort(comparator) : filteredProducts.sort(comparator);
            console.log(dataFiltered);
          break;
        case 'Oldest':
          dataFiltered = !selectedCategory ? data.sort(comparator) : filteredProducts.sort(comparator);
          break;
        case 'High Price':
          dataFiltered = !selectedCategory ? data.sort(comparator) : filteredProducts.sort(comparator);
          break;
        case 'Low Price':
          dataFiltered = !selectedCategory ? data.sort(comparator) : filteredProducts.sort(comparator);
          break;
        case 'Review':
          dataFiltered = !selectedCategory ? data.sort(comparator) : filteredProducts.sort(comparator);
          break;
        default:
          break;
      }
      setFilteredProducts(dataFiltered);
  }

  return (
    <div className={styles.body}>

      <div className={styles.headerIcons}>
        <button onClick={() => navigate(-1)}>
          <img src="/src/assets/return.svg" alt="" />
        </button>
        <Link to='/cart'>
          <img src="/src/assets/shopping-cart.svg" alt="" />
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
     </div>
  )
}

export default Explore
