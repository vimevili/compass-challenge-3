import {useState, MouseEvent} from 'react'
import { useMediaQuery } from '@mui/material'
import styles from './Filters.module.css'

type Props = {handleFilter: (a: string) => void}

const Filters = ({handleFilter}: Props ) => {

  const [category, setCategory] = useState<string | null>('Headphone')
  const isDesktop = useMediaQuery('(min-width:1025px)')
  console.log(category);

  function handleClick(value: string, event: MouseEvent) {
    handleFilter(value)
    const text: string = event.currentTarget.innerHTML;
    setCategory(text);     
  }
  
  
  
  return (
    <div className={styles.filterContainer}>
      <button className={isDesktop && category === 'Headphone' ? styles.filterSelected : styles.filter} onClick={(event) => handleClick('Headphone', event)}>Headphone</button>
      <button className={isDesktop && category === 'Headset' ? styles.filterSelected : styles.filter} onClick={(event) => handleClick('Headset', event)}>Headset</button>
    </div>
  )
}

export default Filters
