import {useState} from 'react'
import Filters from '../Filters'
import styles from './HomeProducts.module.css'

const HomeProducts = () => {

const [filter, setFilter] = useState<string>('Headphone')
  
  function handleFilter(value: string) {
    setFilter(value)
  }
  return (
    <div className={styles.body}>
      <div className={styles.header}>
          <h1 className={styles.title}>{filter}</h1>
          <Filters handleFilter={handleFilter}/>
      </div>
       {/* SEARCH BAR */}
                    <button className={styles.inputs}>
                      <img src="/src/assets/images/search.svg" id='img-lock' alt="" />
                      <input
                        type="search"
                        placeholder="Search headphone"
                      />
                    </button>
    </div>
  )
}

export default HomeProducts
