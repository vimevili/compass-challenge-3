import {useState} from 'react'
import styles from './SortBy.module.css'

const SortBy = ({clearFilters, selectedSortBy, setSelectedSortBy}) => {

  const filters = ['Popularity', 'Newest', 'Oldest', 'High Price', 'Low Price', 'Review']
  
  const handleRadioChange = ({target}) => {
    setSelectedSortBy(target.value)
  };

  const handleClearFilters = () => {
    setSelectedSortBy(null)
    clearFilters()
  };

  return (
      <ul className={styles.filterContainer}>
        {filters.map((filter, index) => 
        
        <li key={index}>
          <input type="radio" 
          checked={selectedSortBy === filter} 
          value={filter}
          id={filter} 
          name="sort-filter" 
          className={styles.radioInput} 
          onChange={handleRadioChange}
          />
          <label htmlFor={filter} className={styles.categoryLabel}>{filter}</label>
        </li>
        )}
    </ul>
  )
}

export default SortBy
