import styles from './ShoppingCart.module.css'
import UseAnimations from "react-useanimations";
import trashIcon from "react-useanimations/lib/trash2";
import ShoppingCard from './UI/ShoppingCard';
import returnIcon from '/src/assets/return.svg'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext';

const ShoppingCart = () => {
  const navigate = useNavigate();

  const productsData = useContext(CartContext)
  
  const {cartProducts,
    setCartProducts,
    handleAddProduct, 
    handleRemoveFromCart, 
    removeOneProduct,
    totalPrice} = productsData

  return (
    <div className={styles.body}>
      <div>
        <div className={styles.headerIcons}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none'}}><img src={returnIcon} alt="" /></button>
          <h2 className={styles.subtitle}>Shopping Cart</h2>
          <button style={{background: 'none', border: 'none'}}><UseAnimations animation={trashIcon} /></button>
        </div>
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
            <button className={styles.button}>Proceed to Checkout <img src="/src/assets/icon.svg" alt="" /></button>
            
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart

