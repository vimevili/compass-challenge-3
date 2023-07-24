import {motion} from 'framer-motion'
import ShopCard from './ShopCard'
import styles from './ShopCarousel.module.css'
import {Link, useParams} from 'react-router-dom'

const ShopCarousel = ({filter}) => {
  const { id } = useParams();

  const headphoneSample = [
    {name:"Bluetooth Sports Headphones", id:3},
    {name:"Premium Over-Ear Headphones", id:5}
  ]

  const headseteSample = [
    {name:"Wireless Gaming Headset", id:4},
    {name:"Budget Wired Headset", id:6}
  ]

  return (
    <motion.div className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
            <motion.div 
              drag='x' 
              dragConstraints={{ right: 0, left: -300}}
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.6}}>
                {filter === 'Headphone' && 
                <ul className={styles.inner}>
                  {headphoneSample.map((headphone) => 
                      <li key={headphone.id}>
                        <Link  to={`/products/${headphone.id}/overview/`} className={styles.link}>
                          <ShopCard title={headphone.name} filter='Headphone'/>
                        </Link>
                      </li>)} 
                </ul>
                }
                {filter === 'Headset' && 
                <ul className={styles.inner}>
                {headseteSample.map((headset) => 
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
