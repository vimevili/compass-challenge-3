import {useEffect, useState} from 'react';
import useFetch from '../../hooks/useFetch';
import styles from './SearchBar.module.css'

// import { useQuery, gql } from "@apollo/client";

const SearchBar = ({handleSearch}) => {

  type Review = {
    date: string,
    description: string,
    rating: number,
    user: string
  }

  type Product = {
    category: string,
    created_at: string,
    description: string,
    id: number,
    imageUrl: string,
    name: string,
    price: string,
    rating: number,
    reviews: [Review],
  }

  const [filteredProducts, setFilteredProducts] = useState<[Product]>();
  const [search, setSearch] = useState<string>('')
  const { data, loading, error} = useFetch();
  console.log(data);

//   const GET_ALL_PRODUCTS = gql`
//     query GetAllProducts {
//       getAllProducts {
//         id
//         imageUrl
//         rating
//         price
//         name
//         description
//         category
//         created_at
//         reviews {
//           user
//           description
//           rating
//         }
//     }
//   }
// `;

  // const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  handleSearch(filteredProducts)

  function handleInput({ target }) {
    setSearch(target.value);
  }

  useEffect(() => {
    if (data) {
      const allProducts = data.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredProducts(allProducts);
    }
  }, [search, data]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
  
  return (
    <div className={styles.inputs}>
      <img src="public/images/icon-search.svg" id='img-lock' alt="" />
      <input
        type="search"
        placeholder="Search headphone"
        value={search}
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchBar;
