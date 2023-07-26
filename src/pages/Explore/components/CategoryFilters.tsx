import { ChangeEvent } from 'react';
import styles from './CategoryFilters.module.css'

type Props = {selectedCategory: string, setSelectedCategory: (a: string) => void}

const CategoryFilters = ({selectedCategory, setSelectedCategory}: Props) => {
  
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target} = event
    setSelectedCategory(target.value)
  };

  return (
    <div className={styles.filterContainer}>
        <input type="radio" 
          checked={selectedCategory === 'Headphones'} 
          value="Headphones"
          id="Headphones" 
          name="category-filter" 
          className={styles.radioInput} 
          onChange={handleOptionChange}/>
        <label htmlFor="Headphones" className={styles.categoryLabel}>Headphones</label>

        <input type="radio" 
          checked={selectedCategory === 'Headsets'} 
          value="Headsets" 
          id="Headsets" 
          name="category-filter" 
          className={styles.radioInput} 
          onChange={handleOptionChange}/>
        <label htmlFor="Headsets" className={styles.categoryLabel}>Headsets</label>
    </div>
  )
}

export default CategoryFilters
