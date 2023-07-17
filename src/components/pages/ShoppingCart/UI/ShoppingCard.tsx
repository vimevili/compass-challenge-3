import styles from './ShoppingCard.module.css'
import { useContext } from 'react';
import { CartContext } from '../../../../contexts/CartContext';

const ShoppingCard = ({product, name, price}) => {

  const productsData = useContext(CartContext) 
  const {handleAddProduct, 
    handleRemoveFromCart, 
    removeOneProduct} = productsData  
  return (
    <div className={styles.cardContainer}>

      <div className={styles.imgContainer}>
        <img src="/public/images/headphones.png" alt="" />
      </div>

        <div className={styles.container}>
          <div>
              <h2 className={styles.title}>{name}</h2>
              <h3 className={styles.price}>USD {price}</h3>
          </div>

      <div className={styles.buttonsContainer}>
        <div className={styles.quantityContainer}>
          <button className={styles.button} onClick={() => removeOneProduct(product.id)}><img src="/public/images/icon-minus.svg" alt="" className={styles.quantButton} /></button>
          <p>{product.quantity}</p>
          <button className={styles.button} onClick={() => handleAddProduct(product)}><img src="/public/images/icon-plus.svg" alt="" className={styles.quantButton} /></button>
        </div>
          <button className={styles.button} onClick={() => handleRemoveFromCart(product)}><img className={styles.more} src="/public/images/icon-trash-2.svg" alt="" /></button>
      </div>
        </div>
    </div>
  )
}

export default ShoppingCard
