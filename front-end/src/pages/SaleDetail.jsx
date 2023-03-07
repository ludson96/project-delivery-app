import React from 'react';
import NavBar from '../components/NavBar';
import SaleDetailsBox from '../components/SaleDetailsBox';

function SaleDetails() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {

    };
  }, []);

  return (
    <div className="sale-details">
      <NavBar />
      <SaleDetailsBox products={ products } />
    </div>
  );
}

export default SaleDetails;
