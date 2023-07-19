import styles from './ShopCard.module.css'

const Card = ({title, filter}) => {
  
  return (
    <div className={styles.container}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.buttonContainer}>
              <button className={styles.shopButton}>Shop now</button>
              <img src="src/assets/icon.svg" alt="" />
            </div>
          </div>
          <img src={filter === 'Headphone' ? "src/assets/headphone.png" : 'src/assets/headset.png'} alt="" />
    </div>
  )
}

export default Card
