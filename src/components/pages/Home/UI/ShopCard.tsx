import styles from './ShopCard.module.css'

const Card = ({title, filter}) => {
  
  return (
    <div className={styles.container}>
          <div className={styles.textContainer}>
            <h2>{title}</h2>
            <div className={styles.buttonContainer}>
              <a href='' className={styles.shopButton}>Shop now</a>
              <img src="/images/icon-arrow-right.svg" alt="" />
            </div>
          </div>
          <img src={filter === 'Headphone' ? "/images/headphones.png" : '/images/headset.png'} alt="" />
    </div>
  )
}

export default Card
