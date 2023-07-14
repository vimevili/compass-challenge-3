import styles from './ProductCard.module.css'

const ProductCard = ({name, reviews, price, rating}) => {
  return (
    <div className={styles.container}>

      <div className={styles.imgContainer}>
        <img src="/public/images/headphones.png" alt="" />
      </div>

      <div className={styles.textContainer}>
        <div>
          <h2 className={styles.title}>{name}</h2>
          <h3 className={styles.price}>USD {price}</h3>
        </div>

        <div className={styles.reviewsContainer}>
          <div className={styles.reviews}>
            <div className={styles.stars}>
                <img src="/public/images/star-filled.svg" alt="" />
                <p className={styles.review}>{rating}</p>
            </div>
            <p className={styles.review}>{reviews} Reviews</p>
          </div>

        </div>
      </div>
          <img className={styles.more} src="/public/images/icon-more-vertical.svg" alt="" />
    </div>
  )
}

export default ProductCard
