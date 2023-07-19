import {motion} from 'framer-motion'
import FeaturedCard from '../UI/FeaturedCard'
import styles from './FeaturedCarousel.module.css'
import { useEffect, useRef, useState } from 'react'

const FeaturedCarousel = () => {

    const featuredProducts = [
        {title:'TMA-2 HD Wireless', price: 350, src: 'src/assets/headphone.png'},
        {title:'CO2 - Cable', price: 25, src: 'src/assets/cable.png'},
        {title:'CO2 - Cable', price: 25, src: 'src/assets/cable.png'},
    ] 
    const [width, setWidth] = useState(0)
    const carousel = useRef()
  
    useEffect(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])
  return (
    <motion.div className={styles.carousel} ref={carousel} whileTap={{cursor: 'grabbing'}}>
            <motion.div className={styles.inner} 
              drag='x' 
              dragConstraints={{ right: 0, left: -width}}
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.6}}>
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
