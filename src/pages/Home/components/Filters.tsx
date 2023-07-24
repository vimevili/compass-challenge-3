import styles from './Filters.module.css'

const Filters = ({handleFilter}) => {

  function handleClick(value) {
    handleFilter(value)
  }

  return (
    <div className={styles.filterContainer}>
      <button className={styles.filter} onClick={() => handleClick('Headphone')}>Headphone</button>
      <button className={styles.filter} onClick={() => handleClick('Headset')}>Headset</button>
    </div>
  )
}

export default Filters
