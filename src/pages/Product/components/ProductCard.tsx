import styles from './ProductCard.module.css'

type Props = {name: string, reviews: number, category: string, price: string, rating: number}
const ProductCard = ({name, reviews, category, price, rating}: Props) => {
  
  return (
    <div className={styles.container}>

      <div className={styles.imgContainer}>
        <img src={category === 'Headphones' ? "src/assets/images/headphone.png" : "src/assets/images/headset.png"} alt="" />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{name}</h2>
          <h3 className={styles.price}>USD {price}</h3>
        </div>

        <div className={styles.reviewsContainer}>
          <div className={styles.reviews}>
            <div className={styles.stars}>
                <img src="/src/assets/images/star.svg" alt="" />
                <p className={styles.review}>{rating}</p>
            </div>
            <p className={styles.review}>{reviews} Reviews</p>
          </div>

        </div>
      </div>
          <img className={styles.more} src="/src/assets/images/more.svg" alt="" />
    </div>
  )
}

export default ProductCard
