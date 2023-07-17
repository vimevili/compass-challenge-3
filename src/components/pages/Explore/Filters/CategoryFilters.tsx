import {useState} from 'react'
import styles from './CategoryFilters.module.css'

const CategoryFilters = ({setSelectedCategory}) => {

  const [selectedOption, setSelectedOption] = useState();
  
  const handleOptionChange = ({target}) => {
    setSelectedOption(target.value);
    setSelectedCategory(target.value)
  };

  return (
    <div className={styles.filterContainer}>
        <input type="radio" 
        checked={selectedOption === 'Headphones'} 
        value="Headphones"
        id="Headphone" 
        name="filter" 
        className={styles.radioInput} 
        onChange={handleOptionChange}/>
        <label htmlFor="Headphone" className={styles.categoryLabel}>Headphone</label>

        <input type="radio" 
        checked={selectedOption === 'Headsets'} 
        value="Headsets" 
        id="Headset" 
        name="filter" 
        className={styles.radioInput} 
        onChange={handleOptionChange}/>
        <label htmlFor="Headset" className={styles.categoryLabel}>Headset</label>
    </div>
  )
}

export default CategoryFilters
