import styles from './ShoppingCart.module.css'
import ShoppingCard from './components/ShoppingCard';
import { useContext } from 'react';
import { CartContext, CartContextData } from '../../contexts/CartContext';
import {motion} from 'framer-motion'
import CartHeader from './components/CartHeader';

const ShoppingCart = () => {

  const cartData: CartContextData = useContext(CartContext)
  const {cartProducts, 
    totalPrice} = cartData

  return (
    <motion.div className={styles.body}
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <div>
        
        <CartHeader />
        
        <ul className={styles.productsContainer}>
          {cartProducts && cartProducts.map((product, index) =>
            <li key={index}>
              <ShoppingCard
                product={product}
                name= {product.name}
                price= {product.price && product.price.substring(1, product.price.length)}
              />
            </li>
            )}
        </ul>
      </div>
      
      <div>
        <div className={styles.totalContainer}>
          <p className={styles.total}>Total {cartProducts && cartProducts.length} {cartProducts && cartProducts.length > 1 ? 'items' : 'item'}</p>
          <h2 className={styles.totalPrice}>USD {totalPrice && totalPrice.toFixed(2)}</h2>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.button}>Proceed to Checkout <img src="/src/assets/images/icon.svg" alt="" /></button>
            
        </div>
      </div>
    </motion.div>
  )
}

export default ShoppingCart

