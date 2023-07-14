import {motion} from 'framer-motion'
import ShopCard from '../UI/ShopCard'
import styles from './ShopCarousel.module.css'

const ShopCarousel = ({filter}) => {
  return (
    <motion.div className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
            <motion.div className={styles.inner}
              drag='x' 
              dragConstraints={{right: 0, left: -295}}>
                {filter === 'Headphone' && 
                <>
                  <ShopCard title={'TMA-2 Modular Headphone'} filter={filter}/>                
                  <ShopCard title={'TMA-2 DJ Modular'} filter={filter}/>
                </>
                }
                {filter === 'Headset' && 
                <>
                  <ShopCard title={'Premium Wireless Headset'} filter={filter}/>                
                  <ShopCard title={'Wired Gaming Headset'} filter={filter}/>
                </>
                }
            </motion.div>
        </motion.div>
  )
}

export default ShopCarousel
