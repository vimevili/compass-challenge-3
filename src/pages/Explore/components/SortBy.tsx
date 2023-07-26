import { ChangeEvent } from 'react';
import styles from './SortBy.module.css'

type Props = {selectedSortBy: string, setSelectedSortBy: (a: string) => void}
const SortBy = ({selectedSortBy, setSelectedSortBy}: Props) => {

  const filters = ['Popularity', 'Newest', 'Oldest', 'High Price', 'Low Price', 'Review']
  
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target} = event
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
