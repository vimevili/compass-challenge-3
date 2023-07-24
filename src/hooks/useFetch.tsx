import {useState, useEffect} from 'react';

function useFetch() {
  const [data, setData] = useState<Product[]>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  interface Product {
    rating: number;
    price: string;
    name: string;
    description: string;
    category: string;
    created_at: Date;
    reviews: {
      user: string;
      description: string;
      rating: number;
      date: Date;
      id: number;
    }[];
    id: number;
  }
  
  useEffect(() => {
    const url = 'https://run.mocky.io/v3/19bc458a-deaa-4a6d-8722-95cb6e904f4d';
    const fetchData = () => {
      setLoading(true);
      fetch(url)
        .then(response => response.json())
        .then(json => {
          setData(json);
          setLoading(false);
        })
        .catch(error => {
          setError('Houve um erro ao solicitar os dados');
          setLoading(false);
        });
    };
  
    fetchData();
  }, []);
  

return { data, error, loading};
}

export default useFetch;
