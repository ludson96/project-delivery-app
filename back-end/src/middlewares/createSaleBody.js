const saleBodyKeys = (req, res, next) => {
  if (!req.body.totalPrice) return res.status(400).json({ message: 'Body needs a totalPrice key' });
  if (!req.body.deliveryAddress) {
    return res.status(400).json({
        message: 'Body needs a deliveryAddress key',
      }); 
  }
  if (!req.body.deliveryNumber) {
    return res.status(400).json({
      message: 'Body needs a deliveryNumber key',
    }); 
  }
  if (!req.body.products) return res.status(400).json({ message: 'Body needs a products key' });
  next();
};

const saleBodyProductsArray = (req, res, next) => {
  if (!Array.isArray(req.body.products)) {
  return res.status(400)
    .json({ message: 'Body needs the products key to be an array' }); 
  }

  next();
};

module.exports = {
  saleBodyKeys,
  saleBodyProductsArray,
};