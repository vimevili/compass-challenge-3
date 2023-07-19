import {useState} from 'react'
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
        checked={selectedCategory === 'Headphone'} 
        value="Headphone"
        id="Headphone" 
        name="category-filter" 
        className={styles.radioInput} 
        onChange={handleOptionChange}/>
        <label htmlFor="Headphone" className={styles.categoryLabel}>Headphone</label>

        <input type="radio" 
        checked={selectedCategory === 'Headset'} 
        value="Headset" 
        id="Headset" 
        name="category-filter" 
        className={styles.radioInput} 
        onChange={handleOptionChange}/>
        <label htmlFor="Headset" className={styles.categoryLabel}>Headset</label>
    </div>
  )
}

export default CategoryFilters
