import {motion} from 'framer-motion'
import FeaturedCard from '../UI/FeaturedCard'
import styles from './FeaturedCarousel.module.css'
const FeaturedCarousel = () => {

    const featuredProducts = [
        {title:'TMA-2 HD Wireless', price: 350, src: '/images/headphones.png'},
        {title:'CO2 - Cable', price: 25, src: '/images/cable.png'},
        {title:'CO2 - Cable', price: 25, src: '/images/cable.png'},

    ]
  return (
    <motion.div className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
            <motion.div className={styles.inner} 
              drag='x' 
              dragConstraints={{right: 0, left: -160}}>
                {
                featuredProducts.map((product, index) => {
                    return <FeaturedCard 
                    key={index}
                    title={product.title} 
                    price={product.price}
                    src={product.src}/>                
                }) }
            </motion.div>
        </motion.div>
  )
}

export default FeaturedCarousel
