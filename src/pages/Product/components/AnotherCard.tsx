import styles from './AnotherCard.module.css'

type CardProps =  {title: string, price: number, src: string}

const AnotherCard = ({title, price, src}: CardProps) => {
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

export default AnotherCard
