import styles from './Specification.module.css'
import {useState, useContext} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import returnIcon from '/src/assets/images/return.svg'
import cartIcon from '/src/assets/images/shopping-cart.svg'
import { CartContext } from '../../contexts/CartContext';
import Loading from '../../components/Loading/Loading';

const Specification = () => {
  const [overChecked, setOverChecked] = useState<boolean>(false)
  const [featureChecked, setFeatureChecked] = useState<boolean>(true)
  const overviewBarOn = overChecked ? styles.barIconOn : styles.barIconOff
  const featureBarOn = featureChecked ? styles.barIconOn : styles.barIconOff

  const handleRadioChange = () => {
    if (overChecked) setOverChecked(false), setFeatureChecked(true)
    if (featureChecked) setFeatureChecked(false), setOverChecked(true)
  };

  const { id } = useParams();
  const {data, loading} = useFetch()
  const navigate = useNavigate()

  const selectedProduct = data && data.find(product => product.id == id)
  const name = selectedProduct && selectedProduct.name
  const price = selectedProduct &&  selectedProduct.price.substring(1, selectedProduct.price.length)
  const description = selectedProduct &&  selectedProduct.description 

  const {handleAddProduct} = useContext(CartContext)

  return (
    <div className={styles.body}>
      {loading && <Loading />}
      {!loading && 
      <>
      <div>
        <div className={styles.headerIcons}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none'}}><img src={returnIcon} alt="" /></button>
        <Link to='/cart'>
            <img src={cartIcon} alt="" />
        </Link>
        </div>
          <div style={{paddingLeft: '1.5rem'}}>
            <h2 className={styles.price}>USD {price}</h2>
            <h1 className={styles.title}>{name}</h1>
            <ul className={styles.linksContainer}>
              <li className={styles.linkContainer}>
                <input type='radio' onClick={()=> navigate(`/products/${id}/overview`)} className={styles.links} name='link' id='overview' checked={overChecked} onChange={handleRadioChange}/>
                <label htmlFor="overview">Overview</label>
                <img src="/src/assets/images/visited-link.svg" alt="" className={overviewBarOn}/>
              </li>
              <li className={styles.linkContainer}>
                <input type='radio' className={styles.links} name='link' id='features' checked={featureChecked} onChange={handleRadioChange}/>
                <label htmlFor="features">Features</label>
                <img src="/src/assets/images/visited-link.svg" alt="" className={featureBarOn}/>
              </li>
            </ul>
          </div>
          
          <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>Highly Detailed Audio</h2>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        
        <div style={{padding: '0 1.5rem 1.5rem 1.5rem'}}>
          <Link to='/cart'>
              <button onClick={() => handleAddProduct(selectedProduct)} className={styles.button}>Add To Cart</button>
          </Link>
        </div> </>} 
      </div>
  )
}

export default Specification
