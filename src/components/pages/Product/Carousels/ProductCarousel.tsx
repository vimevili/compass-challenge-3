import {motion} from 'framer-motion'
import styles from './ProductCarousel.module.css'

const ProductCarousel = () => {

  return (
    <motion.div className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
            <motion.div className={styles.inner} 
              drag='x' 
              dragConstraints={{right: 0, left: -270}}>
                <img src="/public/images/carousel-1.png" alt="" />                
                <img src="/public/images/carousel-2.png" alt="" />                
            </motion.div>
        </motion.div>
  )
}

export default ProductCarousel
