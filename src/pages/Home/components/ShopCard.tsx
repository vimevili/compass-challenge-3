import styles from './ShopCard.module.css'

type Props = {title: string, filter: string}
const Card = ({title, filter}: Props) => {
  
  return (
    <div className={styles.container}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.buttonContainer}>
              <button className={styles.shopButton}>Shop now</button>
              <img src="src/assets/images/icon.svg" alt="" />
            </div>
          </div>
          <img src={filter === 'Headphone' ? "src/assets/images/headphone.png" : 'src/assets/images/headset.png'} alt="" />
    </div>
  )
}

export default Card
