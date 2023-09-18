import styles from './ShopCard.module.css'

type Props = {title: string, filter: string}

const Card = ({title, filter}: Props) => {
  
  let firstWord = '';
  let otherWords = '';
  const words = title.split(' '); 
  firstWord = words[0]
  words.shift(); 
  otherWords = words.join(' '); 
  
  
  
  return (
    <div className={styles.container}>
          <div className={styles.textContainer}>
              <div>
                <h2 className={styles.title}>{firstWord}</h2>
                <h2 className={styles.titleEllipse}>{otherWords}</h2>
              </div>
            <div className={styles.buttonContainer}>
              <button className={styles.shopButton}>Shop now</button>
              <img src="/src/assets/images/arrow-right.svg" alt="" />
            </div>
          </div>
          <img src={filter === 'Headphone' ? "src/assets/images/headphone.png" : 'src/assets/images/headset.png'} alt="" />
    </div>
  )
}

export default Card
