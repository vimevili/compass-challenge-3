import {useState, useEffect} from 'react';

function useFetch() {
  const [data, setData] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
