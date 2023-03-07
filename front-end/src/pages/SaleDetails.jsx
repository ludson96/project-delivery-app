import React from 'react';
import NavBar from '../components/NavBar';
import SaleDetailsBox from '../components/SaleDetailsBox';

function SaleDetails() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getProducts = async () => {
      const { sales = [] } = await getMineSales();
      const correctSale = sales.filter((sale) => sale.id === id);
      setProducts(correctSale.products);
    };
    getProducts();
  }, [id]);

  return (
    <div className="sale-details">
      <NavBar />
      <SaleDetailsBox products={ products } />
    </div>
  );
}

export default SaleDetails;
