import styles from './Filter.module.css'

const Filters = ({handleFilter}) => {
  const filters = ['Headphone', 'Headset']

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
