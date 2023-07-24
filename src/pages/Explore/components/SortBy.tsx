/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import styles from './SortBy.module.css'

const SortBy = ({selectedSortBy, setSelectedSortBy}) => {

  const filters = ['Popularity', 'Newest', 'Oldest', 'High Price', 'Low Price', 'Review']
  
  const handleRadioChange = ({target}) => {
    setSelectedSortBy(target.value)
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
