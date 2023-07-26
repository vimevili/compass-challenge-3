import styles from './SearchInput.module.css'

type Props = {search: string, setSearch: React.Dispatch<React.SetStateAction<string>>}
const SearchInput = ({search, setSearch}: Props) => {
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
