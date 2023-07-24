import styles from './SearchInput.module.css'

const SearchInput = ({search, setSearch}) => {
  return (
    <div className={styles.inputs}>
    <img src="/src/assets/images/search.svg" id='img-lock' alt="" />
    <input
      type="search"
      placeholder="Search headphone"
      value={search}
      onChange={({target}) => setSearch(target.value)}
    />
  </div>
  )
}

export default SearchInput
