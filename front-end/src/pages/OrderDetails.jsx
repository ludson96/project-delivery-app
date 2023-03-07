import React from 'react';
import PropTypes from 'prop-types';
import { httpClient } from '../httpClient';

httpClient.defaults.timeout = 500;

function OrderDetails({ match }) {
  const orderId = match.params.id;

  // const [order, setOrder] = useState({});

  // useEffect(() => {
  //   httpClient.get(backendUrl(`sales:${user.id}`))
  //     .then((res) => {
  //       if (!res.data) return;
  //       setOrder(res.data);
  //     });
  // }, []);

  return (
    <div>{orderId}</div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default OrderDetails;
