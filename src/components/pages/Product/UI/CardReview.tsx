import styles from './CardReview.module.css'
import Stars from './Stars'

const CardReview = ({userName, review, rating}) => {
  return (
    <div>
      <div className={styles.reviewContainer}>
        <img src="/public/images/user-photo.svg" alt="" />
        <div className={styles.stars}>
          <h2 className={styles.userName}>{userName}</h2>
          <Stars rating={rating} />
        </div>
        <p className={styles.userReview}>{review}</p>
      </div>
    </div>
  )
}

export default CardReview
