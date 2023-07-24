import {motion} from 'framer-motion'
import AnotherCard from './AnotherCard'
import styles from './AnotherProductCarousel.module.css'
import {Link } from 'react-router-dom'

const AnotherProductCarousel = () => {
    const anotherProducts = [
        {title:'TMA-2 HD Wireless', price: 350, src: '/src/assets/images/headphone.png'},
        {title:'CO2 - Cable', price: 25, src: '/src/assets/images/cable.png'},
        {title:'CO2 - Cable', price: 25, src: '/src/assets/images/cable.png'},
    ]

  return (
    <motion.div className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
      <div className={styles.header}>
        <h2 className={styles.title}>Another Product</h2>
        <Link to='/products' className={styles.seeAll}>
          See All
        </Link>
      </div>
      <motion.div className={styles.inner} 
       drag='x' 
       dragConstraints={{right: 0, left: -160}}>
        {
          anotherProducts.map((product, index) => {
            return <li key={index}>
              <AnotherCard      
                title={product.title} 
                price={product.price}
                src={product.src}/>                
            </li>})}
      </motion.div>
    </motion.div>
  )
}

export default AnotherProductCarousel