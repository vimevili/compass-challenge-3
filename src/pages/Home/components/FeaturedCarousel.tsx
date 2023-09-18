import {AnimatePresence, motion} from 'framer-motion'
import FeaturedCard from './FeaturedCard'
import styles from './FeaturedCarousel.module.css'
import { useEffect, useRef, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import {Link} from 'react-router-dom'

const FeaturedCarousel = () => {

  const {data} = useFetch();
  const products = data && data
  const carousel = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState<number>(0)

  useEffect(() => {
    const scrollWidth = carousel.current?.scrollWidth;
    const offsetWidth = carousel.current?.offsetWidth;
    const width = scrollWidth! - offsetWidth!;
    setCarouselWidth(width)
  }, [])

  return (
    <AnimatePresence>
       <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
          <motion.div className={styles.inner} 
            drag='x' 
            dragConstraints={{ right: 0, left: -carouselWidth}}
            initial={{x: 100}}
            animate={{x: 0}}
            exit={{x: 100}}
            transition={{duration: 0.6}}>
            {products && <ul className={styles.inner}>
                  {products.map((product) => 
                      <li key={product.id}>
                        <Link to={`/products/${product.id}/overview/`} className={styles.link}>
                          <FeaturedCard title={product.name}
                            price={product.price}
                            src={product.category === 'Headphones' ? '/src/assets/images/headphone.png' : '/src/assets/images/headset.png'}/>
                        </Link>
                      </li>)} 
                </ul>
                }
          </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}

export default FeaturedCarousel
