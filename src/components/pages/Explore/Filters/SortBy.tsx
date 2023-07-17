import {useState} from 'react'
import styles from './SortBy.module.css'

const SortBy = ({setSelectedSortBy}) => {

  const filters = ['Popularity', 'Newest', 'Oldest', 'High Price', 'Low Price', 'Review']
  const [selectedRadio, setSelectedRadio] = useState();
  
  const handleRadioChange = ({target}) => {
    setSelectedRadio(target.value);
    setSelectedSortBy(target.value)
  };

  return (
      <ul className={styles.filterContainer}>
        {filters.map((filter, index) => 
        
        <li key={index}>
          <input type="radio" 
          checked={selectedRadio === filter} 
          value={filter}
          id={filter} 
          name="filter" 
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
