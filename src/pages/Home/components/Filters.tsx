import styles from './Filters.module.css'
type Props = {handleFilter: (a: string) => void}
const Filters = ({handleFilter}: Props ) => {

  function handleClick(value: string) {
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
