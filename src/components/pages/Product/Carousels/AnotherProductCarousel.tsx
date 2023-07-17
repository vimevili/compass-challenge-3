import {motion} from 'framer-motion'
import AnotherCard from './UI/AnotherCard'
import styles from './AnotherProductCarousel.module.css'
import {Link, useParams } from 'react-router-dom'

const AnotherProductCarousel = () => {
    const {id} = useParams();
    const anotherProducts = [
        {title:'TMA-2 HD Wireless', price: 350, src: '/images/headphone.png'},
        {title:'CO2 - Cable', price: 25, src: '/images/cable.png'},
        {title:'CO2 - Cable', price: 25, src: '/images/cable.png'},

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
            return <Link to={`/products/${id}/overview`} className={styles.link}>
              <AnotherCard 
                key={index}
                title={product.title} 
                price={product.price}
                src={product.src}/>                
            </Link>})}
      </motion.div>
    </motion.div>
  )
}

export default AnotherProductCarousel
