import styles from './AllProductsCard.module.css'

const AllProductsCard = ({name, price, src, rating, reviews}) => {
  return (
    <div className={styles.container}>
          <img src={src} alt="" />
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{name}</h2>
            <h2 className={styles.price}>USD {price}</h2>
          </div>
          <div className={styles.reviewsContainer}>
          <div className={styles.reviews}>
            <div className={styles.stars}>
                <img src="/src/assets/star.svg" alt="" />
                <p className={styles.review}>{rating}</p>
            </div>
            <p className={styles.review}>{reviews} Reviews</p>
        </div>
          <img className={styles.more} src="/src/assets/more.svg" alt="" />
      </div>
    </div>
  )
}

export default AllProductsCard
