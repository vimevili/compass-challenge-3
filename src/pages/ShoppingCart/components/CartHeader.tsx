import returnIcon from '../../../assets/images/return.svg'
import UseAnimations from "react-useanimations";
import trashIcon from "react-useanimations/lib/trash2";
import { useNavigate } from 'react-router-dom';
import styles from './CartHeader.module.css'

const CartHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerIcons}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none'}}><img src={returnIcon} alt="" /></button>
        <h2 className={styles.subtitle}>Shopping Cart</h2>
        <button style={{background: 'none', border: 'none'}} onClick={() => clearCart(cartProducts)}><UseAnimations animation={trashIcon} /></button>
    </div>
  )
}

export default CartHeader
