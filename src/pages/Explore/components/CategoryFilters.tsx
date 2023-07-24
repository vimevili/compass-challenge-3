import styles from './CategoryFilters.module.css'

const CategoryFilters = ({clearFilters, selectedCategory, setSelectedCategory}) => {
  
  const handleOptionChange = ({target}) => {
    setSelectedCategory(target.value)
  };

  const handleClearFilters = () => {
    setSelectedCategory(null)
    clearFilters()
  };

  return (
    <div className={styles.filterContainer}>
        <input type="radio" 
          checked={selectedCategory === 'Headphones'} 
          value="Headphones"
          id="Headphones" 
          name="category-filter" 
          className={styles.radioInput} 
          onChange={handleOptionChange}
          onClick={() => setSelectedCategory()}/>
        <label htmlFor="Headphones" className={styles.categoryLabel}>Headphones</label>

        <input type="radio" 
          checked={selectedCategory === 'Headsets'} 
          value="Headsets" 
          id="Headsets" 
          name="category-filter" 
          className={styles.radioInput} 
          onChange={handleOptionChange}
          onClick={() => setSelectedCategory()}/>
        <label htmlFor="Headsets" className={styles.categoryLabel}>Headsets</label>
    </div>
  )
}

export default CategoryFilters
