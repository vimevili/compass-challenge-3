import {AnimatePresence, motion} from 'framer-motion'
import FeaturedCard from './FeaturedCard'
import styles from './FeaturedCarousel.module.css'

const FeaturedCarousel = () => {

    const featuredProducts = [
        {title:'TMA-2 HD Wireless', price: 350, src: 'src/assets/images/headphone.png'},
        {title:'CO2 - Cable', price: 25, src: 'src/assets/images/cable.png'},
        {title:'CO2 - Cable', price: 25, src: 'src/assets/images/cable.png'},
    ] 

  return (
    <AnimatePresence>
       <motion.div className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
          <motion.div className={styles.inner} 
            drag='x' 
            dragConstraints={{ right: 0, left: -165}}
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{duration: 0.6}}>
            {featuredProducts.map((product, index) => {
              return <FeaturedCard 
                key={index}
                title={product.title} 
                price={product.price}
                src={product.src}/>                
              }) }
          </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}

export default FeaturedCarousel
