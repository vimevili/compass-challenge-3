import styles from './AllProductsCard.module.css'
type Props = {name: string, price: string, src: string, rating: number, reviews: number}
const AllProductsCard = ({name, price, src, rating, reviews}: Props) => {
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
                <img src="/src/assets/images/star.svg" alt="" />
                <p className={styles.review}>{rating}</p>
            </div>
            <p className={styles.review}>{reviews} Reviews</p>
        </div>
          <img className={styles.more} src="/src/assets/images/more.svg" alt="" />
      </div>
    </div>
  )
}

export default AllProductsCard
