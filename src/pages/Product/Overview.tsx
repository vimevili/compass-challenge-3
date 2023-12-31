import styles from './Overview.module.css'
import ProductCarousel from './components/ProductCarousel'
import CardReview from './components/CardReview'
import AnotherProductCarousel from './components/AnotherProductCarousel'
import {useState, useContext } from 'react'
import { useNavigate, useParams, Link  } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import cartIcon from '../../../src/assets/images/shopping-cart.svg'
import returnIcon from '../../../src/assets/images/return.svg'
import { CartContext } from '../../contexts/CartContext';
import Loading from '../../components/Loading/Loading';

const Overview = () => {
  
  const [overChecked, setOverChecked] = useState<boolean>(true)
  const [featureChecked, setFeatureChecked] = useState<boolean>(false)
  const overviewBarOn = overChecked ? styles.barIconOn : styles.barIconOff
  const featureBarOn = featureChecked ? styles.barIconOn : styles.barIconOff
  const [buttonText, setButtonText] = useState<string>('Add To Cart')

  const handleRadioChange = () => {
    if (overChecked) setOverChecked(false), setFeatureChecked(true)
    if (featureChecked) setFeatureChecked(false), setOverChecked(true)
  };

  const handleClick = () => {
    handleAddProduct(selectedProduct!)
    setButtonText('Product Added')
    setTimeout(() =>
      {setButtonText('Add To Cart')
      navigate('/cart')}
    , 1100)
  }

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
      {loading && <Loading signout={false}/>}
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
                  <img src="/src/assets/images/visited-link.svg" alt="" className={overviewBarOn}/>
              </li>
            <li className={styles.linkContainer}>
              <input type='radio' onClick={()=> navigate(`/products/${id!}/features`)} className={styles.links} name='link' id='features' checked={featureChecked} onChange={handleRadioChange}/>
              <label htmlFor="features">Features</label>
              <img src="/src/assets/images/visited-link.svg" alt="" className={featureBarOn}/>
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
          <button onClick={handleClick} className={buttonText === 'Add To Cart' ? styles.button : styles.buttonClicked}>{buttonText}</button>
      </div> 
      </>}
    </div>
    
  )
}

export default Overview
