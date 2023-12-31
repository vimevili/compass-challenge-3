import styles from './ShoppingCard.module.css'
import { useContext } from 'react';
import { CartContext, cartProduct } from '../../../contexts/CartContext';

type Props = {product: cartProduct, name: string, price: string}
const ShoppingCard = ({product, name, price}: Props) => {

  const productsData = useContext(CartContext) 
  const {handleAddProduct, 
    handleRemoveFromCart, 
    removeOneProduct} = productsData  
  return (
    <div className={styles.cardContainer}>

      <div className={styles.imgContainer}>
        <img src="src/assets/images/headphone.png" alt="" />
      </div>

        <div className={styles.container}>
          <div>
              <h2 className={styles.title}>{name}</h2>
              <h3 className={styles.price}>USD {price}</h3>
          </div>

      <div className={styles.buttonsContainer}>
        <div className={styles.quantityContainer}>
          <button className={styles.button} onClick={() => removeOneProduct(product.id)}><img src="/src/assets/images/minus.svg" alt="" className={styles.quantButton} /></button>
          <p>{product.quantity}</p>
          <button className={styles.button} onClick={() => handleAddProduct(product)}><img src="/src/assets/images/plus.svg" alt="" className={styles.quantButton} /></button>
        </div>
          <button className={styles.button} onClick={() => handleRemoveFromCart(product)}><img className={styles.more} src="/src/assets/images/trash.svg" alt="" /></button>
      </div>
        </div>
    </div>
  )
}

export default ShoppingCard
