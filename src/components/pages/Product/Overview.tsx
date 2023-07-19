import styles from './Overview.module.css'
import ProductCarousel from './Carousels/ProductCarousel'
import CardReview from './UI/CardReview'
import AnotherProductCarousel from './Carousels/AnotherProductCarousel'
import {useState, useContext } from 'react'
import { useNavigate, useParams, Link  } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import cartIcon from '../../../assets/shopping-cart.svg'
import returnIcon from '../../../assets/return.svg'
import { CartContext } from '../../../contexts/CartContext';
import Loading from '../Loading/Loading';

const Overview = () => {
  
  const [overChecked, setOverChecked] = useState(true)
  const [featureChecked, setFeatureChecked] = useState(false)
  const overviewBarOn = overChecked ? styles.barIconOn : styles.barIconOff
  const featureBarOn = featureChecked ? styles.barIconOn : styles.barIconOff
  const handleRadioChange = () => {
    if (overChecked) setOverChecked(false), setFeatureChecked(true)
    if (featureChecked) setFeatureChecked(false), setOverChecked(true)
  };
  
  const { id } = useParams();
  const navigate = useNavigate();
  const {data, loading} = useFetch()

  
  const productsData = useContext(CartContext)
  const {handleAddProduct} = productsData

  const selectedProduct = data && data.find(product => product.id == id)
  const name = selectedProduct && selectedProduct.name
  const price = selectedProduct &&  selectedProduct.price.substring(1, selectedProduct.price.length)
  const reviews = selectedProduct &&  selectedProduct.reviews  

  return ( 
    <div className={styles.body}>
      {loading && <Loading />}
      {!loading && 
      <>
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
                  <input type='radio' className={styles.links} name='link' id='overview' checked={overChecked} onChange={handleRadioChange}/>
                  <label htmlFor="overview">Overview</label>
                  <img src="/src/assets/visited-link.svg" alt="" className={overviewBarOn}/>
              </li>
            <li className={styles.linkContainer}>
              <input type='radio' onClick={()=> navigate(`/products/${id}/features`)} className={styles.links} name='link' id='features' checked={featureChecked} onChange={handleRadioChange}/>
              <label htmlFor="features">Features</label>
              <img src="/src/assets/visited-link.svg" alt="" className={featureBarOn}/>
            </li>
        </ul>
      </div>
      <ProductCarousel />
      <ul className={styles.reviewsContainer}>
        <p style={{paddingLeft: '1.5rem'}}>Reviews ({reviews && reviews.length})</p>
        {reviews && reviews.map((review, index) => 
        <li key={index}>
          <CardReview 
          userName={review.user}
          review={review.description}
          rating={review.rating}/> 
        </li>)}
      </ul>
      <AnotherProductCarousel />
      <div style={{padding: '0 1.5rem 1.5rem 1.5rem'}}>
        <Link to='/cart'>
          <button onClick={() => handleAddProduct(selectedProduct)} className={styles.button}>Add To Cart</button>
        </Link>
      </div>
      </>}
    </div>
    
  )
}

export default Overview
