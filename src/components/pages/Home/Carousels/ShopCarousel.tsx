import {motion} from 'framer-motion'
import ShopCard from '../UI/ShopCard'
import styles from './ShopCarousel.module.css'
import {Link, useParams} from 'react-router-dom'

const ShopCarousel = ({filter}) => {
  const { id } = useParams();
  console.log(id);

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
            <motion.div className={styles.inner}
              drag='x' 
              dragConstraints={{ right: 0, left: -345}}
              initial={{x: 100}}
              animate={{x: 0}}
              transition={{duration: 0.6}}>
                {filter === 'Headphone' && 
                <ul>
                  {headphoneSample.map((headphone) => 
                      <li key={headphone.id}>
                        <Link to={`/products/${headphone.id}/overview/`} className={styles.link} >
                          <ShopCard title={headphone.name} filter={filter}/>
                        </Link>
                      </li>)} 
                </ul>
                }
                {filter === 'Headset' && 
                <ul>
                {headseteSample.map((headset) => 
                  <li key={headset.id}>
                    <Link to={`/products/${headset.id}/overview/`} className={styles.link} >
                      <ShopCard title={headset.name} filter={filter}/>
                    </Link>
                  </li>)}
              </ul>
                }
            </motion.div>
        </motion.div>
  )
}

export default ShopCarousel
