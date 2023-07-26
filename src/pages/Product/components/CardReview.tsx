import styles from './CardReview.module.css'
import Stars from './Stars'

type CardProps =  {userName: string, review: string, rating: number}

const CardReview = ({userName, review, rating}: CardProps) => {
  return (
    <div>
      <div className={styles.reviewContainer}>
        <img src="/src/assets/images/user-photo.svg" alt="" />
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
