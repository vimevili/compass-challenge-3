import {motion} from 'framer-motion'
import ShopCard from './ShopCard'
import styles from './ShopCarousel.module.css'
import {Link} from 'react-router-dom'
import useFetch from '../../../hooks/useFetch';
import { Product } from '../../../contexts/CartContext'
import {useEffect, useRef, useState} from 'react'

type Props = {filter: string}

const ShopCarousel = ({filter}: Props) => {

  const {data} = useFetch();
  const headphones: Product[] = filter === 'Headphone' && data ? data.filter((headphone) => headphone) : [];
  const headsets: Product[] = filter === 'Headset' && data ? data.filter((headset) => headset) : [];

  const carousel = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState<number>(0)

  useEffect(() => {
    const scrollWidth = carousel.current?.scrollWidth;
    const offsetWidth = carousel.current?.offsetWidth;
    const width = scrollWidth! - offsetWidth!;
    setCarouselWidth(width)
  }, [])

  return (
    <motion.div className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
            <motion.div 
              drag='x' 
              dragConstraints={{ right: 0, left: -carouselWidth}}
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.6}}>
                {filter === 'Headphone' && 
                <ul className={styles.inner}>
                  {headphones.map((headphone) => 
                      <li key={headphone.id}>
                        <Link  to={`/products/${headphone.id}/overview/`} className={styles.link}>
                          <ShopCard title={headphone.name} filter='Headphone'/>
                        </Link>
                      </li>)} 
                </ul>
                }
                {filter === 'Headset' && 
                <ul className={styles.inner}>
                {headsets.map((headset) => 
                  <li key={headset.id}>
                    <Link to={`/products/${headset.id}/overview/`} className={styles.link} >
                      <ShopCard title={headset.name} filter='Headset'/>
                    </Link>
                  </li>)}
              </ul>
                }
            </motion.div>
        </motion.div>
  )
}

export default ShopCarousel
