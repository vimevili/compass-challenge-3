import styles from './FeaturedCard.module.css'

const FeaturedCard = ({title, price, src}) => {
  
  return (
    <div className={styles.container}>
          <img src={src} alt="" />
          <div className={styles.textContainer}>
            <h2 className={styles.titulo}>{title}</h2>
            <h2 className={styles.price}>USD {price}</h2>
          </div>
    </div>
  )
}

export default FeaturedCard
